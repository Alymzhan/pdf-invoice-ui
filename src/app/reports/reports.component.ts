import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Files, GeneratedFile, OneFileResponseData } from '../models/files.model';
import { InvoicePDFService } from '../invoice-pdf/invoice-pdf.service';
import { User } from '../auth/user.model';
import { CityService } from '../shared/city.service';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
 })
export class ReportsComponent implements OnInit, OnDestroy{
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
  columnsToDisplay = ['ID', 'CreatedAt', 'fileName', 'region', 'quantity', 'checked', 'editListLink'];
  isAuthenticated = false;
  private userSub: Subscription;
  user: User | null;
  randomPercent: number;
  fileId: number = 0;
  file: OneFileResponseData;
  panelOpenState = true;

  constructor(private invoiceService: InvoicePDFService,
    private authService: AuthService,
    private cityService: CityService,
    private snackBar: MatSnackBar
    ) {
      this.userSub = this.authService.user.subscribe(user => {
        this.isAuthenticated = !!user;
        this.user = user;
      });
    }

  toggleRow(element: any): void {
    this.expandedElement = this.expandedElement === element ? null : element;
  } 

  ngOnInit() {
    this.subscription = this.invoiceService.getFiles(this.user? this.user?.id : 0).subscribe(files => {
      this.updateTable(files.Files)
    });
  }

  getRegionName(value: string): string {
    return this.cityService.getName(value);
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
    this.userSub.unsubscribe();
  }

  getStatusColor(amount: number): any {
    if (amount < 30) {
      return { color: 'red' };
    } else if (amount >= 30 && amount < 70) {
      return { color: 'yellow' };
    } else {
      return { color: 'green' };
    }
  }

  openFile(fileId : number):void {
    this.fileId = fileId;
    this.subscription = this.invoiceService.getFile(this.fileId).subscribe(file => {
      if (file) {
        this.file = file;
        this.panelOpenState = false;
      }
    });
  }

  percentOfCompleted(total: number, completed: number) {
    if (total !== 0) {
      const result = (completed / total) * 100;
      return parseFloat(result.toFixed(1)); 
    } else {
      return 0;
    }
  }

  generateRandomNumber(): number {
    return Math.floor(Math.random() * 1000) + 1; // Generate random number between 1 and 1000
  }

  downloadFile(file: GeneratedFile): void {
    this.invoiceService.downloadFile(file.fileName).subscribe(
      (response: Blob) => {
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
}
