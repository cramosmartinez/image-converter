// lib/json-utils.ts

export interface ValidationResult {
  success: boolean;
  json?: any;
  error?: string;
}

export function validateAndParse(text: string): ValidationResult {
  if (!text.trim()) {
    return { success: false, error: "Input is empty." };
  }
  try {
    const json = JSON.parse(text);
    return { success: true, json };
  } catch (e: any) {
    // Si el parseo falla, devolvemos el error de sintaxis de JS.
    return { success: false, error: e.message };
  }
}

export function formatJson(json: any): string {
  // Identación de 2 espacios para máxima legibilidad
  return JSON.stringify(json, null, 2);
}

export function minifyJson(json: any): string {
  // Minifica sin espacios para reducir el tamaño
  return JSON.stringify(json);
}

export function jsonToCsv(json: any): string {
  if (!Array.isArray(json) || json.length === 0) {
    return "Error: JSON must be a non-empty array of objects.";
  }

  // Extraer las cabeceras (keys) del primer objeto
  const header = Object.keys(json[0]).join(',');
  
  // Mapear cada objeto a una fila, escapando comillas para CSV
  const rows = json.map(obj => 
    Object.values(obj).map(val => {
      // Si el valor es null o undefined, usa una cadena vacía
      const safeVal = val === null || val === undefined ? '' : String(val);
      // Escapa comillas dobles y envuelve el valor
      return `"${safeVal.replace(/"/g, '""')}"`; 
    }).join(',')
  );

  return [header, ...rows].join('\n');
}