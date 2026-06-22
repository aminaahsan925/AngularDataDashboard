import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CsvService, CSVData } from './services/csv.service';
import { UploadComponent } from './components/upload/upload.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, UploadComponent, DashboardComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'DataWhisper Analytics';
  csvData: CSVData | null = null;
  fileName: string = '';
  loading: boolean = false;
  error: string = '';
  isDarkMode: boolean = true;

  features = [
    { icon: '📤', title: 'Drag & Drop Upload', desc: 'Upload CSV files instantly with drag-and-drop' },
    { icon: '📊', title: 'Auto Statistics', desc: 'Get instant insights: rows, columns, data types' },
    { icon: '📈', title: 'Beautiful Charts', desc: 'Visualize data with interactive bar charts' },
    { icon: '🔍', title: 'Search & Filter', desc: 'Search across all data instantly' },
    { icon: '📥', title: 'Export Results', desc: 'Download analyzed data as CSV' },
    { icon: '🎨', title: 'Dark & Light Mode', desc: 'Choose your preferred theme' }
  ];

  constructor(private csvService: CsvService) {
    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode = savedTheme ? savedTheme === 'dark' : true;
    this.applyTheme();
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.applyTheme();
  }

  applyTheme(): void {
    const root = document.documentElement;
    if (this.isDarkMode) {
      root.style.setProperty('--mode', 'dark');
      root.style.setProperty('--bg-primary', '#0a0e27');
      root.style.setProperty('--bg-secondary', '#1a1f3a');
      root.style.setProperty('--text-primary', '#e0e7ff');
      root.style.setProperty('--text-secondary', '#a0aec0');
      root.style.setProperty('--border-color', '#2d3748');
    } else {
      root.style.setProperty('--mode', 'light');
      root.style.setProperty('--bg-primary', '#f8f9fa');
      root.style.setProperty('--bg-secondary', '#ffffff');
      root.style.setProperty('--text-primary', '#1a202c');
      root.style.setProperty('--text-secondary', '#4a5568');
      root.style.setProperty('--border-color', '#e2e8f0');
    }
  }

  onFileSelected(file: File): void {
    this.loading = true;
    this.error = '';
    this.fileName = file.name;

    this.csvService.parseCSV(file).then(
      (data) => {
        this.csvData = data;
        this.loading = false;
      },
      (error) => {
        this.error = `Error reading file: ${error.message}`;
        this.loading = false;
      }
    );
  }

  resetData(): void {
    this.csvData = null;
    this.fileName = '';
    this.error = '';
  }
}
