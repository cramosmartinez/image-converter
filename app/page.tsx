import JsonTool from '@/components/JsonTool';
import { FileJson, CheckCircle } from 'lucide-react';
import Link from 'next/link';

// Definición del Schema Markup para SEO
const jsonSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "CodeBerry JSON Formatter & CSV Converter",
  "operatingSystem": "Web Browser",
  "applicationCategory": "DeveloperTool",
  "description": "Free online tool to format, minify, and convert JSON to CSV, running entirely client-side for privacy and speed.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8", 
    "reviewCount": "50" 
  }
};

export default function JsonPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F7] pt-24 pb-20">
      
      {/* ⚠️ INYECCIÓN DEL SCHEMA (SEO TÉCNICO) ⚠️ */}
      {/* Esto le dice a Google que esta página es una aplicación de software */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonSchema) }}
      />
      
      <div className="text-center max-w-4xl mx-auto px-4">
        
        {/* Encabezado SEO */}
        <div className="flex justify-center items-center gap-2 mb-2">
            <div className="bg-blue-600 p-1.5 rounded-full">
              <FileJson className="h-4 w-4 text-white" />
            </div>
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">CodeBerry JSON Utility</span>
        </div>

        {/* Título Optimizado para SEO (H1) */}
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
          Free Online JSON Formatter, Minifier & CSV Converter
        </h1>
        
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
          Fast, client-side tools for JSON validation and conversion. No data leaves your browser.
        </p>

      </div>

      {/* La Herramienta Principal */}
      <JsonTool />

      {/* Footer Técnico / SEO Content */}
      <div className="max-w-6xl mx-auto px-4 mt-20 border-t pt-10">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Why Use a Client-Side JSON Tool?</h2>
        <p className="text-slate-600 mb-4">
          As developers, <strong>privacy and speed</strong> are paramount. Unlike many online tools, CodeBerry's JSON processing happens entirely on your local machine using JavaScript. This avoids network latency and ensures sensitive data remains secure.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                    <h3 className="font-bold text-slate-800">For Developers: Minification</h3>
                    <p className="text-sm text-slate-600">Minify JSON API responses before shipping them to production environments to save bandwidth.</p>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                    <h3 className="font-bold text-slate-800">For Data Analysts: CSV Conversion</h3>
                    <p className="text-sm text-slate-600">Easily transform complex JSON arrays into standard CSV format for spreadsheets and database import.</p>
                </div>
            </div>
        </div>
        
        <div className="mt-10 text-center">
            <Link href="/" className="text-blue-600 hover:text-blue-800 font-semibold underline">
                ← Go back to the Image Compressor
            </Link>
        </div>
      </div>
    </main>
  );
}