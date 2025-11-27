import BatchProcessor from '@/components/batch-processor';
import { ShieldCheck, Zap, Lock, Terminal, Cpu } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] pb-32">
      
      {/* HEADER */}
      <section className="pt-20 pb-16 px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-6">
          <Cpu className="w-3 h-3" /> v2.0 Batch Processor
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-6">
          CodeBerry <span className="text-blue-600">Pro</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
          The most powerful <strong>client-side</strong> image compressor. <br/>
          Batch processing, ZIP support, and visual comparison.
        </p>
        
        {/* Badges para JS.ORG */}
        <div className="flex justify-center gap-3 opacity-80 mb-10">
          <img src="https://img.shields.io/github/stars/cramosmartinez/image-converter?style=social" alt="Stars" />
          <img src="https://img.shields.io/badge/Privacy-100%25-green" alt="Privacy" />
        </div>
      </section>

      {/* APP CORE */}
      <section className="px-4 md:px-6">
        <BatchProcessor />
      </section>

      {/* DEVELOPER DOCS (JS.ORG COMPLIANCE) */}
      <section id="how-it-works" className="max-w-4xl mx-auto mt-32 border-t pt-16 px-6">
        <div className="flex items-center gap-3 mb-6">
          <Terminal className="w-6 h-6 text-slate-900" />
          <h2 className="text-2xl font-bold text-slate-900">Developer Documentation</h2>
        </div>
        <p className="text-slate-600 mb-6">
          This project pushes the limits of what's possible in a browser. It uses <strong>WebAssembly</strong> to handle multi-threaded image compression and <strong>JSZip</strong> to bundle files on the fly, without touching a backend server.
        </p>
        <div className="bg-slate-900 text-slate-300 p-6 rounded-xl overflow-x-auto font-mono text-sm">
          <pre>{`// Example: Client-Side Batch Processing
import imageCompression from 'browser-image-compression';
import JSZip from 'jszip';

async function batchProcess(files) {
  const zip = new JSZip();
  
  // Process in parallel
  await Promise.all(files.map(async (file) => {
    const compressed = await imageCompression(file, {
      maxSizeMB: 1,
      useWebWorker: true
    });
    zip.file(file.name, compressed);
  }));
  
  return await zip.generateAsync({ type: 'blob' });
}`}</pre>
        </div>
        <div className="mt-4 text-center">
           <a href="https://github.com/cramosmartinez/image-converter" target="_blank" className="text-blue-600 hover:underline font-bold">View Source Code on GitHub →</a>
        </div>
      </section>

    </main>
  );
}