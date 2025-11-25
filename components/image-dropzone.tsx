// components/image-dropzone.tsx
'use client' // ¡Vital! Esto le dice a Next.js que esto corre en el navegador

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { compressImage } from '@/lib/compressor';
import { UploadCloud, Download, Loader2 } from 'lucide-react';

export default function ImageDropzone() {
  const [isCompressing, setIsCompressing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<string>('');
  const [newSize, setNewSize] = useState<string>('');

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsCompressing(true);
    setDownloadUrl(null);
    setOriginalSize((file.size / 1024 / 1024).toFixed(2) + ' MB');

    try {
      const compressedBlob = await compressImage(file);
      setNewSize((compressedBlob.size / 1024 / 1024).toFixed(2) + ' MB');
      
      // Crear URL de descarga
      const url = URL.createObjectURL(compressedBlob);
      setDownloadUrl(url);
    } catch (error) {
      alert("Hubo un error comprimiendo la imagen");
    } finally {
      setIsCompressing(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: { 'image/*': [] }, // Acepta cualquier imagen
    maxFiles: 1
  });

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Zona de Drop */}
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
      >
        <input {...getInputProps()} />
        
        {isCompressing ? (
          <div className="flex flex-col items-center gap-2 text-blue-600">
            <Loader2 className="h-10 w-10 animate-spin" />
            <p>Comprimiendo...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <UploadCloud className="h-10 w-10" />
            {isDragActive ? (
              <p className="font-medium text-blue-500">¡Suéltala aquí!</p>
            ) : (
              <p>Arrastra una imagen o haz clic aquí</p>
            )}
          </div>
        )}
      </div>

      {/* Resultado y Descarga */}
      {downloadUrl && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-center animate-in fade-in slide-in-from-bottom-4">
          <p className="text-sm text-gray-600 mb-2">
            De <span className="line-through text-red-400">{originalSize}</span> a <span className="font-bold text-green-600">{newSize}</span>
          </p>
          <a 
            href={downloadUrl} 
            download="imagen-comprimida.jpg"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
          >
            <Download className="h-4 w-4" />
            Descargar Imagen
          </a>
        </div>
      )}
    </div>
  );
}