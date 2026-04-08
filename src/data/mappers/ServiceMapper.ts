/**
 * Mapper: GViz JSON → ServiceData[]
 * Converte dados brutos do Google Sheets em entidades de domínio
 * Estrutura esperada: Serviço | Jan_Qtd | Jan_Fat | Fev_Qtd | Fev_Fat | ... | Total_Qtd | Total_Fat
 */

import { ServiceData, MonthlyData } from '../../domain/types/common';
import { GVizData } from '../googleSheets/parseGViz';
import { parseCurrency, parseNumber, toId } from '../../shared/utils/parsing';
import { MONTHS_FULL } from '../../shared/constants';

export class ServiceMapper {
  /**
   * Converter GViz data para ServiceData[]
   * @param gvizData - Dados do Google Sheets (GViz format)
   * @returns ServiceData[] ou null se inválido
   */
  static fromGViz(gvizData: GVizData): ServiceData[] | null {
    try {
      // Validar estrutura esperada
      const requiredCols = ['Serviço', 'Total_Qtd', 'Total_Fat'];
      const missingCols = requiredCols.filter(
        (col) =>
          !gvizData.columns.some((c) => c.toLowerCase().includes(col.toLowerCase()))
      );

      if (missingCols.length > 0) {
        console.error(
          `ServiceMapper: Missing columns: ${missingCols.join(', ')}`
        );
        return null;
      }

      // Mapear cada linha
      const services: ServiceData[] = gvizData.rows
        .map((row) => this.mapRow(row, gvizData.columns))
        .filter((s): s is ServiceData => s !== null);

      return services.length > 0 ? services : null;
    } catch (error) {
      console.error('ServiceMapper.fromGViz error:', error);
      return null;
    }
  }

  /**
   * Mapear uma linha do Google Sheets para ServiceData
   */
  private static mapRow(
    row: Record<string, any>,
    columns: string[]
  ): ServiceData | null {
    try {
      // Encontrar coluna de serviço
      const serviceName = row['Serviço'];
      if (!serviceName) return null;

      const id = toId(serviceName);

      // Extrair dados de 12 meses
      const monthlyData: MonthlyData[] = [];

      const monthConfigs = [
        { qtyCol: 'Jan_Qtd', revCol: 'Jan_Fat', month: 'Janeiro' },
        { qtyCol: 'Fev_Qtd', revCol: 'Fev_Fat', month: 'Fevereiro' },
        { qtyCol: 'Mar_Qtd', revCol: 'Mar_Fat', month: 'Março' },
        { qtyCol: 'Abr_Qtd', revCol: 'Abr_Fat', month: 'Abril' },
        { qtyCol: 'Mai_Qtd', revCol: 'Mai_Fat', month: 'Maio' },
        { qtyCol: 'Jun_Qtd', revCol: 'Jun_Fat', month: 'Junho' },
        { qtyCol: 'Jul_Qtd', revCol: 'Jul_Fat', month: 'Julho' },
        { qtyCol: 'Ago_Qtd', revCol: 'Ago_Fat', month: 'Agosto' },
        { qtyCol: 'Set_Qtd', revCol: 'Set_Fat', month: 'Setembro' },
        { qtyCol: 'Out_Qtd', revCol: 'Out_Fat', month: 'Outubro' },
        { qtyCol: 'Nov_Qtd', revCol: 'Nov_Fat', month: 'Novembro' },
        { qtyCol: 'Dez_Qtd', revCol: 'Dez_Fat', month: 'Dezembro' },
      ];

      for (const m of monthConfigs) {
        const qty = parseNumber(row[m.qtyCol]);
        const rev = parseCurrency(row[m.revCol]);

        // Incluir mês se tiver algum dado
        if (qty > 0 || rev > 0) {
          monthlyData.push({
            month: m.month,
            quantity: qty,
            quantityTarget: 0,
            revenue: rev,
            revenueTarget: 0,
          });
        }
      }

      // Se não tiver dados de mês, descarta
      if (monthlyData.length === 0) return null;

      // Calcular totais
      const totalQuantity = parseNumber(row['Total_Qtd']) ||
        monthlyData.reduce((s, m) => s + m.quantity, 0);
      const totalRevenue = parseCurrency(row['Total_Fat']) ||
        monthlyData.reduce((s, m) => s + m.revenue, 0);

      // Calcular ticket médio
      const ticketMedio =
        totalQuantity > 0 ? totalRevenue / totalQuantity : 0;

      return {
        id,
        name: serviceName,
        quantity: totalQuantity,
        quantityTarget: 0, // TODO: buscar de coluna Target se existir
        revenue: totalRevenue,
        revenueTarget: 0, // TODO: buscar de coluna Target se existir
        ticketMedio,
        monthlyData,
      };
    } catch (error) {
      console.error('ServiceMapper.mapRow error:', error);
      return null;
    }
  }
}
