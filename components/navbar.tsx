'use client';

import Link from "next/link";
import { Github, Cpu, LayoutGrid, Zap, ChevronDown, Download, Terminal } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Lista de Productos (Usamos subdominios para navegar)
  const products = [
    { 
      name: "Image Compressor", 
      description: "Client-side image batch processing", 
      href: "https://codeberry.js.org",
      icon: <Zap className="w-4 h-4 text-purple-600" />
    },
    { 
      name: "JSON Utility Tool", 
      description: "Formatter, Minifier & CSV Converter", 
      href: "https://json.codeberry.js.org", // URL a tu segundo proyecto
      icon: <LayoutGrid className="w-4 h-4 text-blue-600" />
    },
    { 
      name: "Source Code", 
      description: "View the repository on GitHub", 
      href: "https://github.com/cramosmartinez/image-converter",
      icon: <Terminal className="w-4 h-4 text-green-600" />
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo / Marca Principal */}
          <Link href="https://codeberry.js.org" className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Cpu className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">
              CodeBerry
            </span>
          </Link>

          {/* Menú Central / Productos */}
          <div className="flex items-center gap-6" ref={menuRef}>
            
            {/* Botón de Productos */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-1 text-base font-medium text-slate-600 hover:text-blue-600 transition-colors py-2 px-3 rounded-lg border border-transparent hover:border-slate-300"
            >
              Tools ({products.length})
              <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* --- DROPDOWN DESPLEGABLE --- */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full mt-2 w-72 right-0 rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 z-20 p-2"
                >
                  <div className="text-xs font-bold text-slate-500 uppercase px-3 py-2">Our Utility Suite</div>
                  {products.map((product) => (
                    <a
                      key={product.name}
                      href={product.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="p-2 bg-slate-100 rounded-lg">{product.icon}</div>
                      <div>
                        <p className="font-semibold text-slate-800">{product.name}</p>
                        <p className="text-xs text-slate-500">{product.description}</p>
                      </div>
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Botón de GitHub */}
          <a 
            href="https://github.com/cramosmartinez/image-converter" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-full text-sm font-medium transition-all shadow-lg shadow-slate-900/20 active:scale-95"
          >
            <Github className="h-4 w-4" />
            <span>Star on GitHub</span>
          </a>

        </div>
      </div>
    </nav>
  );
}