// components/JsonTool.tsx
'use client';

import React, { useState } from 'react';
import { validateAndParse, formatJson, minifyJson, jsonToCsv } from '@/lib/json-utils';
import { AlertTriangle, Code, Download, Copy, Check, Clipboard } from 'lucide-react';

export default function JsonTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Paste your JSON here.');

  const handleProcess = (action: 'format' | 'minify' | 'csv') => {
    setError(null);
    setCopySuccess(false);
    
    const validation = validateAndParse(input);

    if (!validation.success) {
      setError(validation.error || 'Invalid JSON syntax.');
      setOutput('');
      return;
    }

    const { json } = validation;
    
    let newOutput = '';
    let newStatus = '';

    try {
      if (action === 'format') {
        newOutput = formatJson(json);
        newStatus = 'JSON formatted successfully.';
      } else if (action === 'minify') {
        newOutput = minifyJson(json);
        newStatus = 'JSON minified successfully.';
      } else if (action === 'csv') {
        newOutput = jsonToCsv(json);
        newStatus = 'JSON converted to CSV.';
      }
      setOutput(newOutput);
      setStatusMessage(newStatus);

    } catch (e: any) {
      setError(e.message);
      setOutput('');
      setStatusMessage('Error processing action.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleDownload = (type: 'json' | 'csv') => {
    if (!output) return;
    const blob = new Blob([output], { type: type === 'json' ? 'application/json' : 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `codeberry_data.${type}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-white shadow-xl rounded-2xl border border-gray-100">
      
      {/* Botones de Acción */}
      <div className="flex flex-wrap gap-3 mb-6 justify-center">
        <button
          onClick={() => handleProcess('format')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-md active:scale-95"
        >
          <Code className="w-4 h-4" /> Format / Pretty Print
        </button>
        <button
          onClick={() => handleProcess('minify')}
          className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white font-semibold rounded-lg transition-colors shadow-md active:scale-95"
        >
          <Code className="w-4 h-4" /> Minify
        </button>
        <button
          onClick={() => handleProcess('csv')}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors shadow-md active:scale-95"
        >
          <Code className="w-4 h-4" /> JSON → CSV
        </button>
        <button
          onClick={() => { setInput(''); setOutput(''); setError(null); setStatusMessage('Input cleared.'); }}
          className="px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors active:scale-95"
        >
          Clear
        </button>
      </div>

      {/* Áreas de Edición */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Input */}
        <div>
          <h2 className="text-lg font-semibold mb-2 text-gray-800 flex justify-between items-center">
            Input JSON 
            <span className="text-xs font-medium text-gray-500">Validate: {input.length > 0 ? (error ? 'Invalid' : 'Valid') : 'Waiting'}</span>
          </h2>
          <textarea
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(null); }}
            className={`w-full h-96 p-4 font-mono text-sm border-2 rounded-lg resize-none focus:outline-none ${error ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
            placeholder="Paste your JSON or CSV content here..."
          />
        </div>

        {/* Output */}
        <div>
          <h2 className="text-lg font-semibold mb-2 text-gray-800 flex justify-between items-center">
            Output ({output ? (output.startsWith('Error') ? 'Error' : output.length > 0 ? 'Ready' : 'Waiting') : 'Waiting'})
            <div className="flex gap-2">
              <button onClick={handleCopy} disabled={!output || !!error} className="text-xs text-gray-600 hover:text-blue-600 disabled:opacity-50 flex items-center gap-1">
                {copySuccess ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />} Copy
              </button>
              {output && output.length > 0 && !error && (
                <button onClick={() => handleDownload(output.startsWith('Error') ? 'json' : (output.includes(',') && !output.includes(':')) ? 'csv' : 'json')} className="text-xs text-gray-600 hover:text-blue-600 disabled:opacity-50 flex items-center gap-1">
                  <Download className="w-4 h-4" /> Download
                </button>
              )}
            </div>
          </h2>
          <textarea
            value={output}
            readOnly
            className={`w-full h-96 p-4 font-mono text-sm border-2 rounded-lg resize-none bg-gray-50 ${error ? 'border-red-500 text-red-700' : 'border-gray-300 text-gray-800'}`}
            placeholder="Processed output will appear here..."
          />
        </div>
      </div>

      {/* Mensajes de Estado / Error */}
      <div className="mt-6">
        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-100 border border-red-300 text-red-800 rounded-lg">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-semibold">Error:</span> {error}
          </div>
        )}
        {!error && statusMessage && (
          <div className="p-3 text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg">
            Status: {statusMessage}
          </div>
        )}
      </div>

    </div>
  );
}