import ImageDropzone from '@/components/image-dropzone';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      
      {/* Contenedor Principal Limitado */}
      <div className="w-full max-w-2xl text-center space-y-8">
        
        {/* Encabezado */}
        <div className="space-y-4">
          <div className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold mb-2">
            Beta v1.0
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Comprime tus imágenes <br />
            <span className="text-blue-600">privadamente</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-lg mx-auto leading-relaxed">
            Sin servidores. Sin esperas. Tus fotos se procesan en tu navegador usando tecnología WebAssembly.
          </p>
        </div>

        {/* La Herramienta (Dropzone) */}
        <div className="bg-white p-2 rounded-2xl shadow-xl shadow-gray-200/50">
           <ImageDropzone />
        </div>

        {/* Footer Minimalista */}
        <div className="pt-10 flex justify-center gap-4 text-sm text-gray-400">
          <span>🔒 100% Seguro</span>
          <span>•</span>
          <span>⚡ Ultrarrápido</span>
          <span>•</span>
          <span>💸 Gratis</span>
        </div>

      </div>
    </main>
  );
}