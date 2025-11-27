'use client'

import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { compressImage } from '@/lib/compressor';
import { UploadCloud, Download, Loader2, Settings2, Image as ImageIcon, ArrowRight } from 'lucide-react';

export default function ImageDropzone() {
  const [isCompressing, setIsCompressing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [fileInfo, setFileInfo] = useState<{ name: string; originalSize: number; compressedSize: number } | null>(null);
  
  // Configuración
  const [quality, setQuality] = useState<number>(0.8);
  const [format, setFormat] = useState<string>('image/jpeg');

  // Limpieza de memoria al desmontar
  useEffect(() => {
    return () => {
      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    };
  }, [downloadUrl]);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsCompressing(true);
    setDownloadUrl(null);
    setFileInfo(null);

    try {
      const compressedBlob = await compressImage(file, quality, format);
      
      setFileInfo({
        name: file.name,
        originalSize: file.size,
        compressedSize: compressedBlob.size
      });
      
      const url = URL.createObjectURL(compressedBlob);
      setDownloadUrl(url);
    } catch (error) {
      alert("Error processing image. Please try another file.");
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
    <div className="w-full max-w-xl mx-auto bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
      
      {/* --- BARRA DE HERRAMIENTAS --- */}
      <div className="bg-slate-50/50 border-b border-slate-100 p-4 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
          <Settings2 className="w-4 h-4 text-blue-500" />
          <span>Settings</span>
        </div>

        <div className="flex gap-4 w-full sm:w-auto">
          {/* Slider Compacto */}
          <div className="flex flex-col w-full sm:w-32">
            <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 flex justify-between">
              Quality <span>{Math.round(quality * 100)}%</span>
            </label>
            <input 
              type="range" min="0.1" max="1" step="0.1" 
              value={quality} 
              onChange={(e) => setQuality(parseFloat(e.target.value))}
              className="h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Selector Compacto */}
          <select 
            value={format} 
            onChange={(e) => setFormat(e.target.value)}
            className="text-xs font-medium p-1.5 bg-white border border-slate-200 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-slate-600"
          >
            <option value="image/jpeg">JPEG</option>
            <option value="image/png">PNG</option>
            <option value="image/webp">WebP</option>
          </select>
        </div>
      </div>

      {/* --- ÁREA PRINCIPAL --- */}
      <div className="p-8">
        {!downloadUrl ? (
          <div 
            {...getRootProps()} 
            className={`group border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ease-in-out
              ${isDragActive ? 'border-blue-500 bg-blue-50/50 scale-[1.02]' : 'border-slate-200 hover:border-blue-400 hover:bg-slate-50'}`}
          >
            <input {...getInputProps()} />
            
            {isCompressing ? (
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500 blur-lg opacity-20 rounded-full animate-pulse"></div>
                  <Loader2 className="h-12 w-12 text-blue-600 animate-spin relative z-10" />
                </div>
                <p className="font-medium text-slate-600 animate-pulse">Compressing locally...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 bg-blue-50 text-blue-600 rounded-full group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  <UploadCloud className="h-8 w-8" />
                </div>
                <div>
                  <p className="font-bold text-lg text-slate-700">Click to upload</p>
                  <p className="text-slate-400 text-sm mt-1">or drag and drop your image</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* --- VISTA DE RESULTADO --- */
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-sm">
                  <ImageIcon className="w-6 h-6 text-slate-400" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-700 truncate max-w-[150px]">{fileInfo?.name}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                    <span>{fileInfo && formatBytes(fileInfo.originalSize)}</span>
                    <ArrowRight className="w-3 h-3" />
                    <span className="font-bold text-green-600">{fileInfo && formatBytes(fileInfo.compressedSize)}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <span className="block text-xl font-bold text-green-600">
                  {fileInfo && Math.round(((fileInfo.originalSize - fileInfo.compressedSize) / fileInfo.originalSize) * 100)}%
                </span>
                <span className="text-[10px] uppercase font-bold text-green-600/70">Saved</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => { setDownloadUrl(null); setFileInfo(null); }}
                className="px-4 py-3 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
              >
                Compress Another
              </button>
              <a 
                href={downloadUrl} 
                download={`compressed-codeberry.${format.split('/')[1]}`}
                className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95"
              >
                <Download className="w-4 h-4" />
                Download
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}