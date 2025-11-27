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
          CodeBerry <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Pro</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
          The most powerful <strong>client-side</strong> image compressor. <br/>
          Batch processing, ZIP support, and visual comparison.
        </p>
        
        {/* Badges para JS.ORG */}
        <div className="flex justify-center gap-3 opacity-80 mb-10">
          <a href="https://github.com/cramosmartinez/image-converter" target="_blank" rel="noopener noreferrer">
            <img src="https://img.shields.io/github/stars/cramosmartinez/image-converter?style=social" alt="Stars" />
          </a>
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
          <h2 className="text-3xl font-bold">Developer Implementation</h2>
        </div>
        <p className="text-slate-600 mb-6 text-lg leading-relaxed">
          This project pushes the limits of client-side processing. It uses <strong>WebAssembly</strong> for multi-threaded compression and **JSZip** for on-the-fly ZIP generation.
        </p>
        <div className="bg-slate-900 text-slate-300 p-6 rounded-xl border border-slate-800 font-mono text-sm overflow-x-auto">
          <pre>{`// Example: Client-Side Batch Processing
import imageCompression from 'browser-image-compression';
import JSZip from 'jszip';

async function batchProcess(files) {
  const zip = new JSZip();
  
  // Process in parallel
  await Promise.all(files.map(async (file) => {
    // ... compression logic ...
    zip.file(file.name, compressed);
  }));
  
  return await zip.generateAsync({ type: 'blob' });
}`}</pre>
        </div>
        <div className="mt-4 text-center">
           <a href="https://github.com/cramosmartinez/image-converter" target="_blank" className="text-blue-600 hover:underline font-bold">View Source Code on GitHub →</a>
        </div>
      </section>

      {/* FOOTER - NOT USED, AS NAVBAR HAS LINKS */}
    </main>
  );
}