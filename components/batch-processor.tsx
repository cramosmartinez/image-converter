'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { compressImage } from '@/lib/compressor';
import { formatBytes } from '@/lib/utils';
import ComparisonSlider from './comparison';
import { UploadCloud, FileArchive, X, CheckCircle2, Loader2, Settings, Download } from 'lucide-react';

export default function BatchProcessor() {
  // Estados
  const [files, setFiles] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedCount, setProcessedCount] = useState(0);
  
  // Configuración
  const [quality, setQuality] = useState(0.8);
  const [format, setFormat] = useState('image/jpeg');
  const [resize, setResize] = useState(1920);

  // Manejador de subida
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      originalFile: file,
      compressedBlob: null,
      previewOriginal: URL.createObjectURL(file),
      previewCompressed: null,
      status: 'pending', // pending, processing, done, error
      stats: { original: file.size, compressed: 0, saved: 0 }
    }));
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] }
  });

  // Motor de Procesamiento
  const startProcessing = async () => {
    setIsProcessing(true);
    setProcessedCount(0);

    const newFiles = [...files];

    for (let i = 0; i < newFiles.length; i++) {
      if (newFiles[i].status === 'done') continue; // Saltar ya procesados

      newFiles[i].status = 'processing';
      setFiles([...newFiles]); // Actualizar UI

      try {
        const compressed = await compressImage(newFiles[i].originalFile, {
          maxSizeMB: 1,
          maxWidthOrHeight: resize,
          quality: quality,
          fileType: format
        });

        newFiles[i].compressedBlob = compressed;
        newFiles[i].previewCompressed = URL.createObjectURL(compressed);
        newFiles[i].stats.compressed = compressed.size;
        newFiles[i].stats.saved = ((newFiles[i].stats.original - compressed.size) / newFiles[i].stats.original) * 100;
        newFiles[i].status = 'done';
        
        setProcessedCount(prev => prev + 1);
      } catch (err) {
        newFiles[i].status = 'error';
      }
      setFiles([...newFiles]);
    }
    setIsProcessing(false);
  };

  // Generador de ZIP
  const downloadAll = async () => {
    const zip = new JSZip();
    files.forEach(file => {
      if (file.compressedBlob) {
        const ext = format.split('/')[1];
        zip.file(`codeberry_${file.originalFile.name.split('.')[0]}.${ext}`, file.compressedBlob);
      }
    });
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'codeberry-batch.zip');
  };

  const removeFile = (id: string) => {
    setFiles(files.filter(f => f.id !== id));
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      
      {/* 1. CONFIGURACIÓN */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6 flex flex-wrap gap-6 items-end justify-between">
        <div className="flex gap-6 flex-wrap">
          <div className="w-40">
            <label className="text-xs font-bold text-slate-500 uppercase">Quality</label>
            <div className="flex items-center gap-2 mt-1">
              <input type="range" min="0.1" max="1" step="0.1" value={quality} onChange={e => setQuality(parseFloat(e.target.value))} className="w-full accent-blue-600" />
              <span className="text-sm font-mono">{Math.round(quality * 100)}%</span>
            </div>
          </div>
          <div className="w-40">
            <label className="text-xs font-bold text-slate-500 uppercase">Format</label>
            <select value={format} onChange={e => setFormat(e.target.value)} className="w-full mt-1 p-1.5 border rounded text-sm bg-slate-50">
              <option value="image/jpeg">JPEG</option>
              <option value="image/png">PNG</option>
              <option value="image/webp">WebP</option>
            </select>
          </div>
        </div>
        
        {files.length > 0 && !isProcessing && (
          <button onClick={startProcessing} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold transition-all shadow-lg shadow-blue-500/30 flex items-center gap-2">
            <Settings className="w-4 h-4" /> Process {files.length} Images
          </button>
        )}
      </div>

      {/* 2. ZONA DE CARGA */}
      {files.length === 0 && (
        <div {...getRootProps()} className={`border-2 border-dashed rounded-3xl p-20 text-center cursor-pointer transition-all duration-300 ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'}`}>
          <input {...getInputProps()} />
          <UploadCloud className="w-20 h-20 text-slate-300 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-slate-700">Drag & Drop your images here</h3>
          <p className="text-slate-500 mt-2">Supports JPG, PNG, WEBP. Unlimited files.</p>
        </div>
      )}

      {/* 3. LISTA DE ARCHIVOS */}
      <div className="grid gap-4">
        <AnimatePresence>
          {files.map((file) => (
            <motion.div 
              key={file.id} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6 items-center"
            >
              {/* Preview / Comparador */}
              <div className="w-full md:w-64 h-40 flex-shrink-0 bg-slate-100 rounded-lg overflow-hidden relative">
                {file.status === 'done' ? (
                  <ComparisonSlider original={file.previewOriginal} compressed={file.previewCompressed} className="h-full" />
                ) : (
                  <img src={file.previewOriginal} className="w-full h-full object-cover opacity-50" />
                )}
                
                {file.status === 'processing' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm">
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="flex-1 w-full">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-slate-700 truncate max-w-[200px]">{file.originalFile.name}</h4>
                  <button onClick={() => removeFile(file.id)} className="text-slate-400 hover:text-red-500"><X className="w-5 h-5" /></button>
                </div>
                
                <div className="flex gap-4 text-sm text-slate-500 mb-4">
                  <div className="bg-slate-100 px-3 py-1 rounded-md">Original: <strong>{formatBytes(file.stats.original)}</strong></div>
                  {file.status === 'done' && (
                    <>
                      <div className="bg-green-50 text-green-700 px-3 py-1 rounded-md">Compressed: <strong>{formatBytes(file.stats.compressed)}</strong></div>
                      <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-md font-bold">Saved: {Math.round(file.stats.saved)}%</div>
                    </>
                  )}
                </div>

                {/* Acciones Individuales */}
                {file.status === 'done' && (
                  <button 
                    onClick={() => saveAs(file.compressedBlob, `codeberry_${file.originalFile.name}`)}
                    className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" /> Download Single
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 4. ACTIONS FOOTER */}
      {files.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 shadow-2xl z-40">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FileArchive className="w-5 h-5 text-slate-500" />
              <span className="font-bold text-slate-700">{files.length} images ready</span>
            </div>
            
            <div className="flex gap-3">
              <button 
                {...getRootProps()} 
                className="px-4 py-2 border border-slate-300 rounded-lg font-bold text-slate-600 hover:bg-slate-50"
              >
                Add More
              </button>
              
              {processedCount === files.length && processedCount > 0 && (
                <button 
                  onClick={downloadAll}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 shadow-lg shadow-green-500/30 animate-in slide-in-from-bottom-2"
                >
                  <Download className="w-4 h-4" /> Download ZIP
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}