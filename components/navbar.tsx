import Link from "next/link";
import { Github, Terminal, Cpu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo / Marca */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Cpu className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">
              CodeBerry
            </span>
          </div>

          {/* Enlaces Derecha */}
          <div className="flex items-center gap-4">
            <Link 
              href="#how-it-works" 
              className="hidden md:flex text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
            >
              How it works
            </Link>
            
            <a 
              href="https://github.com/cramosmartinez/image-converter" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-full text-sm font-medium transition-all shadow-lg shadow-slate-900/20"
            >
              <Github className="h-4 w-4" />
              <span>Star on GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}