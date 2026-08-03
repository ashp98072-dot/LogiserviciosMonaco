/**
 * Utility to compress and resize images on the client before converting to base64 DataURL.
 * Prevents localStorage quota limits (DOMException 22) and memory crashes.
 */
export async function compressImageFile(
  file: File,
  maxWidth = 900,
  maxHeight = 900,
  quality = 0.78
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith("image/")) {
      reject(new Error("El archivo seleccionado no es una imagen válida."));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Error al leer la imagen seleccionada."));
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (!result) {
        reject(new Error("El archivo está vacío o corrupto."));
        return;
      }

      const img = new Image();
      img.onerror = () => reject(new Error("El formato de imagen no se pudo procesar. Intenta con JPG o PNG."));
      img.onload = () => {
        try {
          let width = img.width;
          let height = img.height;

          // Resize proportionally if dimensions exceed max limits
          if (width > maxWidth || height > maxHeight) {
            if (width / height > maxWidth / maxHeight) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          const canvas = document.createElement("canvas");
          canvas.width = Math.max(1, width);
          canvas.height = Math.max(1, height);

          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(result);
            return;
          }

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Use JPEG compression for photos to drastically shrink storage footprint (e.g., 8MB -> 150KB)
          const isTransparentPng = file.type === "image/png" && file.size < 500000;
          const outputMime = isTransparentPng ? "image/png" : "image/jpeg";
          const dataUrl = canvas.toDataURL(outputMime, quality);
          resolve(dataUrl);
        } catch (err) {
          // Fallback if canvas compression fails
          resolve(result);
        }
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  });
}
