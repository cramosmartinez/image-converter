import ImageDropzone from '@/components/image-dropzone';
import { ShieldCheck, Zap, Lock, Terminal } from 'lucide-react'; // <--- ¡Agregué Terminal aquí!

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-20 pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent"></div>
        
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-1.5 rounded-full shadow-sm mb-4 animate-in fade-in slide-in-from-top-4 duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-semibold text-slate-600 tracking-wide uppercase">Browser-Based Compression</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 pb-2">
            Shrink images, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">keep your privacy.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Compress JPG, PNG, and WebP files efficiently using WebAssembly. 
            <strong>No servers. No uploads.</strong> Your images never leave your device.
          </p>

          {/* GitHub Badges */}
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <a href="https://github.com/cramosmartinez/image-converter" target="_blank" rel="noopener noreferrer">
              <img src="https://img.shields.io/github/stars/cramosmartinez/image-converter?style=social" alt="GitHub Stars" />
            </a>
            <img src="https://img.shields.io/badge/Privacy-100%25-success" alt="Privacy" />
            <img src="https://img.shields.io/badge/License-MIT-blue" alt="License" />
          </div>
        </div>

        {/* --- APP CONTAINER --- */}
        <div className="mt-16 relative z-10 max-w-5xl mx-auto">
          <ImageDropzone />
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="py-20 px-6 bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          <div className="space-y-4 p-6 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">100% Private</h3>
            <p className="text-slate-600">Logic runs in your browser via Web Worker. No API calls, no cloud storage.</p>
          </div>
          <div className="space-y-4 p-6 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Blazing Fast</h3>
            <p className="text-slate-600">Powered by WebAssembly (WASM) for near-native compression speeds.</p>
          </div>
          <div className="space-y-4 p-6 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">MIT Open Source</h3>
            <p className="text-slate-600">Transparent code. Fork it, review it, or host it yourself. Zero trackers.</p>
          </div>
        </div>
      </section>

      {/* --- DEVELOPER SECTION (JS.ORG COMPLIANCE) --- */}
      <section id="how-it-works" className="py-20 px-6 bg-slate-950 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Terminal className="w-8 h-8 text-blue-400" />
            <h2 className="text-3xl font-bold">Developer Implementation</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-slate-400 mb-6 text-lg leading-relaxed">
                CodeBerry demonstrates how to implement <strong>browser-image-compression</strong> in a modern Next.js 14 application. 
                This approach reduces server costs to zero and enhances user privacy.
              </p>
              <ul className="space-y-4 text-slate-300">
                <li className="flex gap-3">
                  <div className="h-6 w-0.5 bg-blue-500"></div>
                  <span>Uses Web Workers to prevent UI freezing</span>
                </li>
                <li className="flex gap-3">
                  <div className="h-6 w-0.5 bg-blue-500"></div>
                  <span>Supports Drag & Drop with <code>react-dropzone</code></span>
                </li>
                <li className="flex gap-3">
                  <div className="h-6 w-0.5 bg-blue-500"></div>
                  <span>Customizable quality/format output</span>
                </li>
              </ul>
              <div className="mt-8">
                <a href="https://github.com/cramosmartinez/image-converter" target="_blank" className="text-blue-400 hover:text-blue-300 font-bold underline decoration-2 underline-offset-4">
                  View Source Code →
                </a>
              </div>
            </div>

            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 font-mono text-sm overflow-x-auto">
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <pre className="text-slate-300">
{`import imageCompression from 
 'browser-image-compression';

// The Core Function
async function compress(file) {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true
  };
  
  return await imageCompression(
    file, 
    options
  );
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-8 text-center text-slate-400 text-sm bg-white border-t border-slate-100">
        <p>© 2024 CodeBerry. Licensed under MIT.</p>
        <p className="mt-2">Hosted on <a href="https://vercel.com" className="hover:text-blue-500">Vercel</a> & <a href="https://js.org" className="hover:text-blue-500">JS.ORG</a></p>
      </footer>
    </main>
  );
}