'use client'

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { compressImage } from '@/lib/compressor';
import { UploadCloud, Download, Loader2, Settings2 } from 'lucide-react';

export default function ImageDropzone() {
  const [isCompressing, setIsCompressing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<string>('');
  const [newSize, setNewSize] = useState<string>('');
  
  // Estados para la configuración (Sin causar bucles infinitos)
  const [quality, setQuality] = useState<number>(0.8);
  const [format, setFormat] = useState<string>('image/jpeg');

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsCompressing(true);
    setDownloadUrl(null);
    setOriginalSize((file.size / 1024 / 1024).toFixed(2) + ' MB');

    try {
      // Pasamos los valores del estado a la función
      const compressedBlob = await compressImage(file, quality, format);
      
      setNewSize((compressedBlob.size / 1024 / 1024).toFixed(2) + ' MB');
      
      // Crear URL de descarga
      const url = URL.createObjectURL(compressedBlob);
      setDownloadUrl(url);
    } catch (error) {
      alert("Hubo un error comprimiendo la imagen");
      console.error(error);
    } finally {
      setIsCompressing(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1
  });

  return (
    <div className="w-full max-w-md mx-auto">
      
      {/* --- PANEL DE CONTROL --- */}
      <div className="mb-6 bg-white border border-gray-200 rounded-xl p-4 shadow-sm text-left">
        <div className="flex items-center gap-2 mb-4 text-gray-700 font-semibold border-b pb-2">
          <Settings2 className="w-4 h-4" />
          <span>Configuración</span>
        </div>

        {/* Slider de Calidad */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <label className="font-medium text-gray-600">Calidad</label>
            <span className="text-blue-600 font-bold">{Math.round(quality * 100)}%</span>
          </div>
          <input 
            type="range" 
            min="0.1" 
            max="1" 
            step="0.1" 
            value={quality} 
            onChange={(e) => setQuality(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        {/* Selector de Formato */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Formato de Salida</label>
          <select 
            value={format} 
            onChange={(e) => setFormat(e.target.value)}
            className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="image/jpeg">JPEG (Mejor compresión)</option>
            <option value="image/png">PNG (Transparencia)</option>
            <option value="image/webp">WebP (Moderno)</option>
          </select>
        </div>
      </div>

      {/* --- ZONA DE DROP --- */}
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-200
          ${isDragActive ? 'border-blue-500 bg-blue-50 scale-105' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'}`}
      >
        <input {...getInputProps()} />
        
        {isCompressing ? (
          <div className="flex flex-col items-center gap-2 text-blue-600">
            <Loader2 className="h-10 w-10 animate-spin" />
            <p className="font-medium">Procesando...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <UploadCloud className="h-10 w-10" />
            {isDragActive ? (
              <p className="font-medium text-blue-500">¡Suéltala!</p>
            ) : (
              <p>Arrastra una imagen o haz clic aquí</p>
            )}
          </div>
        )}
      </div>

      {/* --- RESULTADOS --- */}
      {downloadUrl && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl text-center animate-in fade-in slide-in-from-bottom-4 shadow-sm">
          <div className="flex justify-center items-center gap-4 mb-3 text-sm">
            <div className="text-red-500 line-through decoration-2 opacity-70">{originalSize}</div>
            <div className="text-gray-400">➜</div>
            <div className="text-green-700 font-bold text-lg">{newSize}</div>
          </div>
          
          <a 
            href={downloadUrl} 
            download={`compressed.${format.split('/')[1]}`} // Extensión dinámica
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
          >
            <Download className="h-4 w-4" />
            Descargar Imagen
          </a>
        </div>
      )}
    </div>
  );
}