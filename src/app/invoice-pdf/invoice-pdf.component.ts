import { Component } from '@angular/core';

export interface TableData {
  uploadDateTime: string;
  sourceFileName: string;
  region: string;
  uploadStatus: string;
  downloadLink: string;
}


@Component({
  selector: 'app-invoice-pdf',
  templateUrl: './invoice-pdf.component.html',
  styleUrl: './invoice-pdf.component.css'
})
export class InvoicePdfComponent {
  isDisabled = true;

  showProgressBar = false;
  showFinishText = false;
  finishText='Done!';

  displayedColumns: string[] = ['uploadDateTime', 'sourceFileName', 'region', 'uploadStatus', 'downloadLink'];

  dataSource: TableData[] = [
    { 
      uploadDateTime: '2022-03-10', 
      sourceFileName: 'file1.txt', 
      uploadStatus: 'Successful', 
      region: 'Region1', 
      downloadLink: 'http://example.com/file1.txt' // Sample download link for file1.txt
    },
    { 
      uploadDateTime: '2022-03-11', 
      sourceFileName: 'file2.txt', 
      uploadStatus: 'Failed', 
      region: 'Region2', 
      downloadLink: 'http://example.com/file2.txt' // Sample download link for file2.txt
    },
    { 
      uploadDateTime: '2022-03-12', 
      sourceFileName: 'file3.txt', 
      uploadStatus: 'Pending', 
      region: 'Region3', 
      downloadLink: 'http://example.com/file3.txt' // Sample download link for file3.txt
    },
    // Add more records here
  ];

  startProgress(): void {
    this.showFinishText = false;
    this.finishText='Result was saved!';
    this.showProgressBar = true;
    this.isDisabled=true;
    setTimeout(() => {
      this.showProgressBar = false;
      this.showFinishText = true;
    }, 5000); // 5000 milliseconds = 5 seconds
  }

  onFileSelected(event: any): void {
    const selectedFile = event.target.files[0];
    console.log('Selected File:', selectedFile);
    // Implement logic to handle the selected file (e.g., upload to server)
  }

  xlsxInputChange(fileInputEvent: any) {
    console.log(fileInputEvent.target.files[0]);
  }

  onGenerate(){
    this.showFinishText = false;
    this.finishText='Invoice was generated!';
    this.showProgressBar = true;
    setTimeout(() => {
      this.showProgressBar = false;
      this.showFinishText = true;
      this.isDisabled=false;
    }, 5000); // 5000 milliseconds = 5 seconds
  }

}
