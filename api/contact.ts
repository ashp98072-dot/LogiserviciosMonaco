import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

const emailPattern = /^[^\s@<>\r\n]+@[^\s@<>\r\n]+\.[^\s@<>\r\n]+$/;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, message: "Método no permitido." });
  }

  const body = req.body;
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return res.status(400).json({ success: false, message: "Los datos enviados no son válidos." });
  }
  const fields = { nombre: 200, empresa: 200, correo: 254, telefono: 100, mensaje: 10000 };
  const values: Record<string, string> = {};
  for (const [key, maxLength] of Object.entries(fields)) {
    const value = body[key];
    if (value !== undefined && (typeof value !== "string" || value.length > maxLength)) {
      return res.status(400).json({ success: false, message: "Revisa los datos ingresados e inténtalo de nuevo." });
    }
    values[key] = typeof value === "string" ? value.trim() : "";
  }
  const { nombre, empresa, correo, telefono, mensaje } = values;
  if (!nombre || !mensaje || !emailPattern.test(correo)) {
    return res.status(400).json({ success: false, message: "Ingresa tu nombre, un correo válido y tu mensaje." });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO, CONTACT_CC } = process.env;
  const port = Number(SMTP_PORT);
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO || !CONTACT_CC ||
      ![465, 587].includes(port) || !emailPattern.test(SMTP_USER) ||
      !emailPattern.test(CONTACT_TO) || !emailPattern.test(CONTACT_CC)) {
    return res.status(503).json({ success: false, message: "No pudimos enviar tu solicitud. Por favor, inténtalo más tarde o contáctanos por teléfono." });
  }

  try {
    const transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      requireTLS: port === 587,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 20000,
    });
    await transport.sendMail({
      from: SMTP_USER,
      to: CONTACT_TO,
      cc: CONTACT_CC,
      replyTo: correo,
      subject: "Nueva solicitud de contacto | Logiservicios Mónaco",
      text: `Nombre: ${nombre}\nEmpresa: ${empresa || "No indicada"}\nCorreo: ${correo}\nTeléfono: ${telefono || "No indicado"}\n\nMensaje:\n${mensaje}`,
      disableFileAccess: true,
      disableUrlAccess: true,
    });
    return res.status(200).json({ success: true, message: "¡Gracias! Hemos recibido tu solicitud. Nuestro equipo te contactará pronto." });
  } catch {
    return res.status(502).json({ success: false, message: "No pudimos enviar tu solicitud. Por favor, inténtalo más tarde o contáctanos por teléfono." });
  }
}
