
'use client';

import React, { useState } from 'react';

export default function DocumentScannerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const handleScan = async () => {
    if (!file) return;

    setScanning(true);
    
    // Simulación de escaneo OCR
    setTimeout(() => {
      setScanning(false);
      setResult('Este es un resultado simulado de OCR para el documento subido. En una implementación real, aquí se mostraría el texto extraído del documento.');
    }, 2000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Escáner de Documentos</h1>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Subir Documento
        </label>
        <input
          type="file"
          accept="image/*,.pdf"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </div>

      {file && (
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-2">Archivo seleccionado: {file.name}</p>
          <button
            onClick={handleScan}
            disabled={scanning}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
          >
            {scanning ? 'Escaneando...' : 'Iniciar Escaneo'}
          </button>
        </div>
      )}

      {result && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
          <h2 className="text-lg font-semibold mb-2">Resultado del Escaneo</h2>
          <p className="text-gray-700 whitespace-pre-line">{result}</p>
        </div>
      )}
    </div>
  );
}
