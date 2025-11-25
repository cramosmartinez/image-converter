import imageCompression from 'browser-image-compression';

export async function compressImage(file: File) {
  const options = {
    maxSizeMB: 1,          // Queremos que pese menos de 1MB
    maxWidthOrHeight: 1920, // Redimensionar si es gigante
    useWebWorker: true,    // Usar hilos para no congelar el navegador
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.log(error);
    throw new Error("Error al comprimir la imagen");
  }
}