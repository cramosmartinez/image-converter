import imageCompression from 'browser-image-compression';

export interface CompressionOptions {
  maxSizeMB: number;
  maxWidthOrHeight: number;
  quality: number;
  fileType: string;
}

export async function compressImage(file: File, options: CompressionOptions) {
  const config = {
    maxSizeMB: options.maxSizeMB,
    maxWidthOrHeight: options.maxWidthOrHeight,
    useWebWorker: true,
    initialQuality: options.quality,
    fileType: options.fileType,
  };

  try {
    const compressedFile = await imageCompression(file, config);
    return compressedFile;
  } catch (error) {
    console.error(`Error compressing ${file.name}:`, error);
    throw error;
  }
}