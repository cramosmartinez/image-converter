import imageCompression from 'browser-image-compression';

// Ahora la función acepta calidad y tipo como opciones
export async function compressImage(
  file: File, 
  quality: number = 0.8, 
  type: string = 'image/jpeg'
) {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    initialQuality: quality, // Usamos la calidad del slider
    fileType: type           // Usamos el formato del selector
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error("Error comprimiendo:", error);
    throw error;
  }
}