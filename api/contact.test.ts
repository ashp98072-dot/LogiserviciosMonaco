import assert from "node:assert/strict";
import { test } from "node:test";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";
import handler from "./contact";

test("contact: validation, SMTP configuration and safe responses", async () => {
  const originalEnv = { ...process.env };
  const originalTransport = nodemailer.createTransport;
  let options: any;
  let mail: any;
  let calls = 0;
  let fail = false;
  nodemailer.createTransport = ((config: unknown) => {
    options = config;
    return { sendMail: async (message: unknown) => {
      calls++;
      mail = message;
      if (fail) throw new Error("sensitive SMTP password and server details");
      return { accepted: [process.env.CONTACT_TO, process.env.CONTACT_CC] };
    } };
  }) as typeof nodemailer.createTransport;

  async function request(method: string, body: unknown) {
    const result = { status: 0, headers: {} as Record<string, string>, body: null as any };
    const res = {
      setHeader(key: string, value: string) { result.headers[key] = value; },
      status(code: number) { result.status = code; return this; },
      json(value: unknown) { result.body = value; return this; },
    };
    await handler({ method, body } as VercelRequest, res as unknown as VercelResponse);
    return result;
  }

  const valid = { nombre: " Cliente ", empresa: "Empresa", correo: "cliente@example.com", telefono: "12345678", mensaje: "Cotización" };
  try {
    Object.assign(process.env, {
      SMTP_HOST: "smtp.hostinger.com", SMTP_PORT: "465", SMTP_USER: "sender@example.com",
      SMTP_PASS: "test-only", CONTACT_TO: "info@logiserviciosmonaco.com",
      CONTACT_CC: "administracion2@logiserviciosmonaco.com",
    });
    for (const method of ["GET", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"]) {
      const result = await request(method, valid);
      assert.equal(result.status, 405);
      assert.equal(result.headers.Allow, "POST");
    }
    for (const body of [null, [], "invalid", {}, { ...valid, nombre: " " },
      { ...valid, mensaje: "" }, { ...valid, correo: "invalid" },
      { ...valid, correo: "a@example.com\r\nBcc: other@example.com" },
      { ...valid, empresa: {} }, { ...valid, mensaje: "x".repeat(10001) }]) {
      assert.equal((await request("POST", body)).status, 400);
    }
    assert.equal(calls, 0);
    const success = await request("POST", valid);
    assert.equal(success.status, 200);
    assert.equal(success.body.success, true);
    assert.equal(success.headers["Cache-Control"], "no-store");
    assert.equal(options.secure, true);
    assert.equal(mail.from, process.env.SMTP_USER);
    assert.equal(mail.to, process.env.CONTACT_TO);
    assert.equal(mail.cc, process.env.CONTACT_CC);
    assert.equal(mail.replyTo, valid.correo);
    for (const value of Object.values(valid)) assert.ok(mail.text.includes(value.trim()));
    process.env.SMTP_PORT = "587";
    assert.equal((await request("POST", valid)).status, 200);
    assert.equal(options.secure, false);
    assert.equal(options.requireTLS, true);
    fail = true;
    const failure = await request("POST", valid);
    assert.equal(failure.status, 502);
    assert.ok(!JSON.stringify(failure).includes("sensitive"));
    for (const key of ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "CONTACT_TO", "CONTACT_CC"]) {
      const previous = process.env[key];
      delete process.env[key];
      assert.equal((await request("POST", valid)).status, 503);
      process.env[key] = previous;
    }
  } finally {
    nodemailer.createTransport = originalTransport;
    process.env = originalEnv;
  }
});
