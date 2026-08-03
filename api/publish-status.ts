import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader("Cache-Control", "no-store");
  const hasToken = Boolean(process.env.GITHUB_TOKEN?.trim());
  res.status(200).json({
    serverPublish: hasToken,
    autoSync: true,
    configured: {
      GITHUB_TOKEN: hasToken,
      GITHUB_REPO: Boolean(process.env.GITHUB_REPO?.trim()),
      GITHUB_BRANCH: Boolean(process.env.GITHUB_BRANCH?.trim()),
      CMS_ADMIN_PIN: Boolean(process.env.CMS_ADMIN_PIN?.trim()),
    },
  });
}
