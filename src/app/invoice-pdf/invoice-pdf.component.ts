import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { InvoicePDFService } from './invoice-pdf.service';
import { Files } from '../models/files.model';
import { MatTable } from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';

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
  styleUrl: './invoice-pdf.component.css',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class InvoicePdfComponent implements OnInit, OnDestroy{
  @ViewChild(MatTable) table: MatTable<Files>;
  isDisabled = true;
  files: Files[] = [];
  subscription: Subscription;
  formData: FormData | null;
  selectedFileName: string | null;
  expandedElement: any | null;

  showProgressBar = false;
  showFinishText = false;
  finishText='Done!';
  // displayedColumns: string[] = ['ID', 'CreatedAt', 'fileName', 'size', 'status'];
  columnsToDisplay = ['ID', 'CreatedAt', 'fileName', 'size', 'status'];
  columnsToDisplayWithExpand = ['expand', ...this.columnsToDisplay];

  constructor(private invoiceService: InvoicePDFService,
    // private router: Router,
    // private route: ActivatedRoute
    ) {
}

toggleRow(element: any): void {
  this.expandedElement = this.expandedElement === element ? null : element;
}


  ngOnInit() {
    this.subscription = this.invoiceService.getFiles().subscribe(files => {
      console.log('files.files', files.Files); 
      this.files = files.Files
      this.sortFilesByCreatedAt();
    });
  }

  sortFilesByCreatedAt() {
    this.files.sort((a, b) => {
      return new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  xlsxInputChange(fileInputEvent: any) {
    this.showFinishText = false;
    const file = fileInputEvent.target.files[0];
    this.selectedFileName = file ? file.name : null;
    this.formData = new FormData();
    this.formData.append('file', file);
  }

  uploadFile(formData: FormData) {
    this.showProgressBar = true;
    this.invoiceService.sendFile(formData).subscribe(
      response => {
        if (response.status) {
          // Handle successful file upload response
          this.showFinishText = true;
          this.finishText = 'Файл успешно загружен.';
          this.showProgressBar = false;
          this.files.push(response.File); // Add the uploaded file to the files array
          this.sortFilesByCreatedAt();
          this.table.renderRows();
          console.log('this.files after', this.files);
          console.log('response after', response);
        } else {
          // Handle error
          console.error('File upload error:', response.message);
          this.showProgressBar = false;
          this.showFinishText = true;
          this.finishText = 'Ошибка загрузки файла.';
        }
      },
      error => {
        // Handle error
        console.error('File upload error:', error);
        this.showProgressBar = false;
        this.showFinishText = true;
        this.finishText = 'Ошибка загрузки файла.';
      }
    );
  }

  downloadFile(fileName: string): void {
    // Implement file download logic here
    console.log(`Downloading ${fileName}...`);
  }

  onGenerate(){
    if (this.formData) {
      this.uploadFile(this.formData);
      this.clearSelection();
    }
  }

  clearSelection(){
    this.selectedFileName = null;
    this.formData = null;
  }
}
