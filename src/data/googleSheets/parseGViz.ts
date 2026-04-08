/**
 * Parser para Google Visualization API
 * Remove wrapper: google.visualization.Query.setResponse(...) e converte para JSON tipado
 */

export interface GVizData {
  columns: string[];
  rows: Record<string, any>[];
}

/**
 * Parse resposta do Google Sheets gviz API
 * Formato: google.visualization.Query.setResponse({...});
 */
export function parseGVizResponse(responseText: string): GVizData {
  try {
    // Remove wrapper: google.visualization.Query.setResponse( e );
    const jsonStr = responseText
      .replace(/^google\.visualization\.Query\.setResponse\(/, '')
      .replace(/\);?$/, '');

    const json = JSON.parse(jsonStr);

    // Validar estrutura
    if (!json.table?.cols || !Array.isArray(json.table.cols)) {
      throw new Error('Missing or invalid cols in response');
    }

    if (!json.table?.rows || !Array.isArray(json.table.rows)) {
      throw new Error('Missing or invalid rows in response');
    }

    // Extrair nomes das colunas
    const columns = json.table.cols.map((col: any) => col.label || '');

    // Converter rows em objetos
    const rows: Record<string, any>[] = json.table.rows.map(
      (row: any) => {
        const obj: Record<string, any> = {};

        // row.c é array de { v: value, f: formatted }
        columns.forEach((col: string, idx: number) => {
          const cell = row.c?.[idx];
          // Usar 'v' (value) ou 'f' (formatted), com fallback para null
          obj[col] = cell?.v ?? cell?.f ?? null;
        });

        return obj;
      }
    );

    return { columns, rows };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to parse GViz response: ${message}`);
  }
}

/**
 * Validar se GVizData tem colunas esperadas
 */
export function validateGVizColumns(
  data: GVizData,
  expectedColumns: string[]
): string[] {
  const actualCols = data.columns.map((c) => c.toLowerCase());
  const missing = expectedColumns.filter((col) =>
    !actualCols.some((c) => c.includes(col.toLowerCase()))
  );

  return missing;
}
