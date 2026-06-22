import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, ChartOptions, registerables } from 'chart.js';
Chart.register(...registerables);
import { BaseChartDirective } from 'ng2-charts';
import { CSVData } from '../../services/csv.service';
import { CsvService } from '../../services/csv.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  Object = Object;
  @Input() csvData!: CSVData;
  selectedColumn: string = '';
  chartData: any = null;
  searchTerm: string = '';
  filteredRows: any[] = [];
  currentPage: number = 1;
  rowsPerPage: number = 10;

  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#e0e7ff',
          font: { size: 12 }
        }
      }
    },
    scales: {
      y: {
        ticks: { color: '#a0aec0' },
        grid: { color: 'rgba(160, 174, 192, 0.1)' }
      },
      x: {
        ticks: { color: '#a0aec0' },
        grid: { color: 'rgba(160, 174, 192, 0.1)' }
      }
    }
  };

  constructor(private csvService: CsvService) {}

  ngOnInit(): void {
    this.selectedColumn = this.csvData.headers[0];
    this.updateChart();
    this.filteredRows = this.csvData.rows.slice(0, this.rowsPerPage);
  }

  updateChart(): void {
    if (this.selectedColumn) {
      this.chartData = this.csvService.getChartData(
        this.csvData,
        this.selectedColumn,
        'bar'
      );
    }
  }

  onSearch(): void {
    const filtered = this.csvData.rows.filter(row => {
      return Object.values(row).some(val =>
        String(val).toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
    this.filteredRows = filtered.slice(0, this.rowsPerPage);
    this.currentPage = 1;
  }

  resetSearch(): void {
    this.searchTerm = '';
    this.filteredRows = this.csvData.rows.slice(0, this.rowsPerPage);
    this.currentPage = 1;
  }

  downloadCSV(): void {
    let csv = this.csvData.headers.join(',') + '\n';
    this.csvData.rows.forEach(row => {
      const values = this.csvData.headers.map(header => {
        const val = row[header];
        return typeof val === 'string' && val.includes(',') ? `"${val}"` : val;
      });
      csv += values.join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'analysis.csv';
    link.click();
  }

  getMissingPercentage(column: string): string {
    const missing = this.csvData.stats.missingValues[column];
    const percentage = ((missing / this.csvData.stats.totalRows) * 100).toFixed(1);
    return percentage;
  }

  get totalPages(): number {
    return Math.ceil(this.csvData.rows.length / this.rowsPerPage);
  }
}


