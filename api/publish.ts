import type { VercelRequest, VercelResponse } from "@vercel/node";
import { publishSiteDataToGitHub } from "../lib/publishSiteData";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Método no permitido" });
  }

  const githubToken = process.env.GITHUB_TOKEN;
  if (!githubToken) {
    return res.status(503).json({
      success: false,
      useClient: true,
      message: "Publicación automática no configurada en el servidor.",
    });
  }

  const expectedPin = process.env.CMS_ADMIN_PIN;
  const bodyPin = typeof req.body?.pin === "string" ? req.body.pin : "";
  if (expectedPin && bodyPin !== expectedPin) {
    return res.status(401).json({ success: false, message: "PIN de administrador incorrecto." });
  }

  const data = req.body?.data;
  if (!data || typeof data !== "object") {
    return res.status(400).json({ success: false, message: "Datos del sitio inválidos." });
  }

  const repo = process.env.GITHUB_REPO || "ashp98072-dot/LogiserviciosMonaco";
  const branch = process.env.GITHUB_BRANCH || "main";
  const filePath = process.env.GITHUB_FILE_PATH || "site-data.json";

  try {
    const result = await publishSiteDataToGitHub(data as Record<string, unknown>, {
      token: githubToken,
      repo,
      branch,
      filePath,
    });

    if (result.success) {
      return res.status(200).json(result);
    }
    return res.status(502).json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error de red";
    return res.status(500).json({ success: false, message: `Error al publicar: ${message}` });
  }
}
