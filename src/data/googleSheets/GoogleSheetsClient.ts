/**
 * Cliente para Google Sheets - Visualization API
 * Fetch de dados via gviz/tq endpoint com suporte a retry e error handling
 */

import { GVizData, parseGVizResponse } from './parseGViz';

export const SHEET_IDS = {
  SERVICOS_2025_2026: '1i6fmNE8TDQN6ozlb-iOFw2OejuK-GiF6b1z_yYfEDmI',
  KPIS_INDICADORES: '1ENABBoNRHFNhZV3QpwTBegy7AFfi-5oBOwa2iu3VLd8',
  EVOLUCAO_RECEITA: '11Aqi1V7Cbx0loMyTsFJd_gLzpXLpDF0vsxwCwFQ6jdM',
  FUNIL_VENDAS: '1v44E1iRhEzM7FxpZPFCDQN782wEx69Xpf6swjyOiVrU',
} as const;

interface FetchOptions {
  timeout?: number;
  gid?: number;
}

export class GoogleSheetsClient {
  private readonly baseUrl = 'https://docs.google.com/spreadsheets/d';
  private readonly timeout = 30000; // 30 segundos

  /**
   * Fetch dados de uma planilha via Google Visualization API
   * @param sheetId - ID da planilha
   * @param options - { gid, timeout }
   * @returns GVizData com columns e rows
   * @throws Error se não conseguir buscar
   */
  async fetchSheet(
    sheetId: string,
    options: FetchOptions = {}
  ): Promise<GVizData> {
    const { gid = 0, timeout = this.timeout } = options;

    const url = `${this.baseUrl}/${sheetId}/gviz/tq?tqx=out:json&gid=${gid}`;

    try {
      console.log(`📊 Fetching sheet ${sheetId}...`);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      try {
        const response = await fetch(url, {
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(
            `HTTP ${response.status}: ${response.statusText}`
          );
        }

        const text = await response.text();
        const data = parseGVizResponse(text);

        console.log(
          `✅ Sheet ${sheetId} loaded: ${data.rows.length} rows`
        );

        return data;
      } catch (error) {
        clearTimeout(timeoutId);
        throw error;
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : String(error);
      console.error(
        `❌ Failed to fetch sheet ${sheetId}: ${message}`
      );
      throw new Error(`Sheet fetch failed: ${message}`);
    }
  }

  /**
   * Fetch múltiplas planilhas em paralelo
   */
  async fetchMultiple(
    sheets: Array<{ id: string; gid?: number }>
  ): Promise<Map<string, GVizData>> {
    const results = new Map<string, GVizData>();

    const promises = sheets.map((sheet) =>
      this.fetchSheet(sheet.id, { gid: sheet.gid })
        .then((data) => {
          results.set(sheet.id, data);
        })
        .catch((error) => {
          console.error(
            `Failed to fetch ${sheet.id}:`,
            error
          );
          throw error;
        })
    );

    await Promise.all(promises);

    return results;
  }
}
