import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  @Output() fileSelected = new EventEmitter<File>();
  isDragOver = false;

  onFileInput(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.validateAndEmit(file);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
    const file = event.dataTransfer?.files[0];
    if (file) {
      this.validateAndEmit(file);
    }
  }

  private validateAndEmit(file: File): void {
    if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
      this.fileSelected.emit(file);
    } else {
      alert('Please upload a CSV file!');
    }
  }
}
