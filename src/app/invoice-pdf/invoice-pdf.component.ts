import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { InvoicePDFService } from './invoice-pdf.service';
import { Files, GeneratedFile } from '../models/files.model';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CityService } from '../shared/city.service';

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
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  isDisabled = true;
  files = new MatTableDataSource<Files>([]);
  subscription: Subscription;
  formData: FormData | null;
  selectedFileName: string | null;
  expandedElement: any | null;
  showProgressBar = false;
  showFinishText = false;
  finishText='Done!';
  columnsToDisplay = ['ID', 'CreatedAt', 'fileName', 'region', 'size', 'status', 'downloadLink'];
  columnsToDisplayWithExpand = ['expand', ...this.columnsToDisplay];

  cities = this.cityService.cities;
  selectedCity: string = this.cities[0].value;

  constructor(private invoiceService: InvoicePDFService,
    private cityService: CityService,
    // private router: Router,
    // private route: ActivatedRoute
    ) {
}

toggleRow(element: any): void {
  this.expandedElement = this.expandedElement === element ? null : element;
}

  ngOnInit() {
    this.subscription = this.invoiceService.getFiles().subscribe(files => {
      this.updateTable(files.Files)
    });
  }

  updateTable(files: Files[]){
    this.files = new MatTableDataSource<Files>(files);
      this.sortFilesByCreatedAt();
      this.files.paginator = this.paginator; 
  }

  sortFilesByCreatedAt() {
    // this.files.sortData;
    this.files.sort = this.sort;
    this.files.data.sort((a, b) => {
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
    formData.append('region', this.selectedCity);
    this.showProgressBar = true;
    this.invoiceService.sendFile(formData).subscribe(
      response => {
        if (response.status) {
          // Handle successful file upload response
          this.showFinishText = true;
          this.finishText = 'Файл успешно загружен.';
          this.showProgressBar = false;
          const updatedFiles = [...this.files.data, response.File];
          this.updateTable(updatedFiles)
          this.table.renderRows(); // Refresh table
        } else {
          // Handle error
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

  downloadFile(file: GeneratedFile): void {
    this.invoiceService.downloadFile(file.fileName).subscribe(
      (response: Blob) => {
        console.log('file', response);
      const fileBlob = new Blob([response], { type: file.contentType });
      
      // Create a temporary anchor element
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(fileBlob);
      
      // Set the download attribute to specify the file name
      link.download = file.fileName;
      
      // Append the anchor element to the body
      document.body.appendChild(link);
      
      // Programmatically trigger a click event to initiate the download
      link.click();
      
      // Remove the anchor element from the body
      document.body.removeChild(link);
    })
  }

  getRegionName(value: string): string {
    return this.cityService.getName(value);
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
