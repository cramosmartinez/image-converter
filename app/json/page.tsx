import JsonTool from '@/components/JsonTool'; // Asume que este componente existe
import { FileJson, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function JsonPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F7] pt-24 pb-20">
      
      {/* Encabezado SEO */}
      <div className="text-center max-w-4xl mx-auto px-4">
        <div className="flex justify-center items-center gap-2 mb-2">
            <div className="bg-blue-600 p-1.5 rounded-full">
              <FileJson className="h-4 w-4 text-white" />
            </div>
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">CodeBerry JSON Utility</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
          Free Online JSON Formatter, Minifier & CSV Converter
        </h1>
        
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
          Fast, client-side tools for JSON validation and conversion. No data leaves your browser.
        </p>
      </div>

      {/* La Herramienta */}
      {/* ⚠️ NOTA: Asume que tienes el componente JsonTool.tsx creado */}
      <JsonTool /> 

      {/* Footer Técnico / SEO Content */}
      <div className="max-w-6xl mx-auto px-4 mt-20 border-t pt-10">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Why Use a Client-Side JSON Tool?</h2>
        <p className="text-slate-600 mb-4">
          As developers, <strong>privacy and speed</strong> are paramount. This tool processes JSON entirely on your local machine using JavaScript.
        </p>
        
        <div className="mt-10 text-center">
            <Link href="/" className="text-blue-600 hover:text-blue-800 font-semibold underline">
                ← Go back to the Image Compressor
            </Link>
        </div>
      </div>
    </main>
  );
}