import { Injectable } from '@angular/core';
import * as Papa from 'papaparse';

export interface CSVData {
  headers: string[];
  rows: any[];
  stats: {
    totalRows: number;
    totalColumns: number;
    dataTypes: { [key: string]: string };
    missingValues: { [key: string]: number };
    columnStats: { [key: string]: ColumnStats };
  };
}

export interface ColumnStats {
  type: string;
  unique: number;
  missing: number;
  min?: number;
  max?: number;
  average?: number;
  topValues?: { value: string; count: number }[];
}

@Injectable({
  providedIn: 'root'
})
export class CsvService {
  parseCSV(file: File): Promise<CSVData> {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results: any) => {
          try {
            const data: CSVData = {
              headers: results.meta.fields || [],
              rows: results.data || [],
              stats: {
                totalRows: (results.data || []).length,
                totalColumns: (results.meta.fields || []).length,
                dataTypes: {},
                missingValues: {},
                columnStats: {}
              }
            };
            this.calculateStatistics(data);
            resolve(data);
          } catch (error) {
            reject(error);
          }
        },
        error: (error: any) => {
          reject(error);
        }
      });
    });
  }

  private calculateStatistics(data: CSVData): void {
    const headers = data.headers;
    headers.forEach(header => {
      const column = data.rows.map(row => row[header]);
      const nonNull = column.filter(val => val !== null && val !== undefined && val !== '');
      const missing = column.length - nonNull.length;
      let dataType = 'text';
      let isNumber = true;
      let isDate = true;
      for (const val of nonNull) {
        if (isNaN(Number(val))) isNumber = false;
        if (isNaN(Date.parse(val))) isDate = false;
      }
      if (isNumber && nonNull.length > 0) dataType = 'number';
      else if (isDate && nonNull.length > 0) dataType = 'date';
      data.stats.dataTypes[header] = dataType;
      data.stats.missingValues[header] = missing;
      const stats: ColumnStats = {
        type: dataType,
        unique: new Set(nonNull).size,
        missing: missing,
        topValues: []
      };
      if (dataType === 'number') {
        const numbers = nonNull.map(Number).filter(n => !isNaN(n));
        if (numbers.length > 0) {
          stats.min = Math.min(...numbers);
          stats.max = Math.max(...numbers);
          stats.average = numbers.reduce((a, b) => a + b, 0) / numbers.length;
        }
      }
      const valueCounts = new Map<string, number>();
      nonNull.forEach(val => {
        valueCounts.set(val, (valueCounts.get(val) || 0) + 1);
      });
      stats.topValues = Array.from(valueCounts.entries())
        .map(([value, count]) => ({ value, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
      data.stats.columnStats[header] = stats;
    });
  }

  getChartData(data: CSVData, columnName: string, chartType: 'bar' | 'pie' | 'line') {
    const column = data.rows.map(row => row[columnName]);
    const stats = data.stats.columnStats[columnName];
    if (!stats || !stats.topValues) {
      return { labels: [], datasets: [] };
    }
    const labels = stats.topValues.map(v => String(v.value).substring(0, 20));
    const dataValues = stats.topValues.map(v => v.count);
    const colors = this.generateColors(dataValues.length);
    const dataset = {
      label: columnName,
      data: dataValues,
      backgroundColor: colors,
      borderColor: 'rgba(147, 112, 219, 0.8)',
      borderWidth: 2
    };
    return { labels: labels, datasets: [dataset] };
  }

  private generateColors(count: number): string[] {
    const baseColors = [
      'rgba(147, 112, 219, 0.7)',
      'rgba(0, 206, 209, 0.7)',
      'rgba(50, 205, 50, 0.7)',
      'rgba(255, 165, 0, 0.7)',
      'rgba(220, 20, 60, 0.7)',
      'rgba(30, 144, 255, 0.7)'
    ];
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      colors.push(baseColors[i % baseColors.length]);
    }
    return colors;
  }
}
