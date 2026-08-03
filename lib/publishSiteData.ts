export interface PublishOptions {
  token: string;
  repo: string;
  branch?: string;
  filePath?: string;
}

export interface PublishResult {
  success: boolean;
  message: string;
  updatedAt?: string;
}

function githubAuthHeader(token: string): string {
  return token.startsWith("ghp_") || token.startsWith("github_pat_")
    ? `Bearer ${token}`
    : `token ${token}`;
}

export async function publishSiteDataToGitHub(
  siteData: Record<string, unknown>,
  options: PublishOptions,
): Promise<PublishResult> {
  const cleanRepo = options.repo
    .replace("https://github.com/", "")
    .replace(".git", "")
    .replace(/^\/+|\/+$/g, "")
    .trim();
  const filePath = options.filePath || "site-data.json";
  const branch = options.branch || "main";
  const authHeader = githubAuthHeader(options.token);

  let sha: string | undefined;
  try {
    const getRes = await fetch(
      `https://api.github.com/repos/${cleanRepo}/contents/${filePath}?ref=${branch}`,
      {
        headers: {
          Authorization: authHeader,
          Accept: "application/vnd.github.v3+json",
        },
      },
    );
    if (getRes.ok) {
      const fileData = (await getRes.json()) as { sha?: string };
      sha = fileData.sha;
    }
  } catch {
    // new file or repo
  }

  const updatedAt = new Date().toISOString();
  const payload = { ...siteData, updatedAt };
  const jsonString = JSON.stringify(payload, null, 2);
  const utf8Bytes = new TextEncoder().encode(jsonString);
  let binary = "";
  for (let i = 0; i < utf8Bytes.length; i++) {
    binary += String.fromCharCode(utf8Bytes[i]);
  }
  const base64Content = btoa(binary);

  const putRes = await fetch(`https://api.github.com/repos/${cleanRepo}/contents/${filePath}`, {
    method: "PUT",
    headers: {
      Authorization: authHeader,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: `Actualización CMS Logiservicios Monaco (${new Date().toLocaleString("es-GT")})`,
      content: base64Content,
      sha,
      branch,
    }),
  });

  if (putRes.ok) {
    return {
      success: true,
      message: "¡Sitio web actualizado! Los cambios ya están en línea para todos.",
      updatedAt,
    };
  }

  const errData = (await putRes.json().catch(() => ({ message: "Error desconocido" }))) as {
    message?: string;
  };
  return {
    success: false,
    message: `No se pudo publicar (${putRes.status}): ${errData.message || "Verifica la configuración del servidor."}`,
  };
}
