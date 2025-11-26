import ImageDropzone from '@/components/image-dropzone';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 font-sans">
      
      {/* --- CONTENEDOR PRINCIPAL --- */}
      <div className="w-full max-w-3xl text-center space-y-10 my-10">
        
        {/* 1. ENCABEZADO TÉCNICO (Branding Open Source) */}
        <div className="space-y-6">
          
          {/* Etiqueta de Versión */}
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            v1.0.0 Public Beta
          </div>

          {/* Título Principal */}
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
            CodeBerry <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Compressor</span>
          </h1>
          
          {/* Descripción Técnica */}
          <p className="text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
            An open-source, <strong>client-side image compression tool</strong> built with Next.js and WebAssembly.
            <br className="hidden md:block" />
            Optimize images efficiently without sending data to any server.
          </p>

          {/* 2. BADGES DE GITHUB (Vital para JS.ORG) */}
          <div className="flex flex-wrap justify-center gap-3 opacity-90">
            {/* GitHub Stars */}
            <a href="https://github.com/cramosmartinez/image-converter" target="_blank" rel="noopener noreferrer">
              <img src="https://img.shields.io/github/stars/cramosmartinez/image-converter?style=social" alt="GitHub Stars" />
            </a>
            {/* Licencia */}
            <img src="https://img.shields.io/github/license/cramosmartinez/image-converter?color=blue" alt="License MIT" />
            {/* Tech Stack */}
            <img src="https://img.shields.io/badge/Built%20with-Next.js-black" alt="Built with Next.js" />
            <img src="https://img.shields.io/badge/Privacy-100%25-green" alt="Privacy Focused" />
          </div>
        </div>

        {/* 3. LA HERRAMIENTA (Componente Dropzone) */}
        <div className="bg-white p-4 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100">
           <ImageDropzone />
        </div>

        {/* 4. SECCIÓN EDUCATIVA (Tu seguro de vida con JS.ORG) */}
        <div className="mt-20 text-left border-t border-gray-200 pt-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-slate-900 rounded-lg text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800">How it works (Developer Guide)</h2>
          </div>

          <p className="text-slate-600 mb-6 leading-relaxed">
            This tool demonstrates how to implement <strong>secure image processing</strong> in the browser. 
            Instead of uploading files to a backend API, we use a Web Worker to compress the binary data locally using the CPU.
          </p>

          {/* Bloque de Código */}
          <div className="bg-[#0d1117] text-slate-300 p-6 rounded-xl overflow-x-auto shadow-inner border border-slate-800">
            <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-2">
              <span className="text-xs font-mono text-blue-400">lib/compressor.ts</span>
              <span className="text-xs text-slate-500">TypeScript</span>
            </div>
            <pre className="text-sm font-mono leading-relaxed">
{`import imageCompression from 'browser-image-compression';

export async function compressImage(file: File) {
  // Configuration for the compression algorithm
  const options = {
    maxSizeMB: 1,          // Target size ~1MB
    maxWidthOrHeight: 1920, // Resize to standard HD
    useWebWorker: true,    // Run in background thread
    initialQuality: 0.7    // Initial compression ratio
  };

  try {
    // Process the file strictly on the client-side
    const compressedBlob = await imageCompression(file, options);
    return compressedBlob;
  } catch (error) {
    console.error("Compression failed:", error);
    throw error;
  }
}`}
            </pre>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 text-blue-800 rounded-lg text-sm border border-blue-100">
            <strong>💡 Want to contribute?</strong> Check out the source code, report bugs, or suggest features on our <a href="https://github.com/cramosmartinez/image-converter" target="_blank" className="underline font-bold hover:text-blue-600">GitHub Repository</a>.
          </div>
        </div>

        {/* 5. FOOTER TÉCNICO */}
        <footer className="pt-10 pb-4 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 border-t border-slate-100 mt-10">
          <p>© 2024 CodeBerry Open Source Project.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="https://github.com/cramosmartinez/image-converter" target="_blank" className="hover:text-slate-600 transition-colors">Source Code</a>
            <a href="https://github.com/cramosmartinez/image-converter/issues" target="_blank" className="hover:text-slate-600 transition-colors">Report Bug</a>
            <a href="https://js.org" target="_blank" className="hover:text-slate-600 transition-colors">Host: JS.ORG</a>
          </div>
        </footer>

      </div>
    </main>
  );
}