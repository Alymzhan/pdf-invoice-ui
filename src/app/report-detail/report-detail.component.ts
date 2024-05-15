import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Files, GeneratedFile, OneFileResponseData, Records } from '../models/files.model';
import { InvoicePDFService } from '../invoice-pdf/invoice-pdf.service';
import { User } from '../auth/user.model';
import { CityService } from '../shared/city.service';


@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrl: './report-detail.component.css'
 })
export class ReportDetailComponent implements OnInit, OnDestroy, OnChanges{
  @Input() fileId: number;
  @Input() file: OneFileResponseData;
  @ViewChild(MatTable) table: MatTable<Records>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  isDisabled = true;
  records = new MatTableDataSource<Records>([]);
  subscription: Subscription;
  formData: FormData | null;
  selectedFileName: string | null;
  expandedElement: any | null;
  showProgressBar = false;
  showFinishText = false;
  finishText='Done!';
  columnsToDisplay = ['sendStatus', 'fullName', 'ssn', 'referenceNumber', 'referenceDate', 'invoiceDate', 'invoiceNumber', 'itemDescription', 'itemQuantity', 'itemPrice', 'totalSum', 'editLink'];
  isAuthenticated = false;
  private userSub: Subscription;
  user: User | null;
  randomPercent: number;
  panelOpenState = true;
  error: string = '';

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
    this.updateTable(this.file?.File)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.file) {
      this.updateTable(this.file.File);
    }
  }

  getRegionName(value?: string): string {
    if (value)
      return this.cityService.getName(value);
    else 
      return ''
  }

  updateTable(file: Files){
    this.records = new MatTableDataSource<Records>(file?.records);
      this.sortFilesByCreatedAt();
      this.records.paginator = this.paginator; 
    this.updateOriginalValues()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.records.filter = filterValue.trim().toLowerCase();
  }

  sortFilesByCreatedAt() {
    // this.files.sortData;
    this.records.sort = this.sort;
    // this.records.data.sort((a, b) => {
    //   return new Date(b.CellB) - new Date(a.CellB).getTime();
    // });
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
  }

  calculateChecked(){
    let checked = 0;
    let totalAmount = 0;
    let totalItems = 0;
    this.file.File.records.forEach(item => {
      if (item.CellSEND) {
        checked++;
        totalItems=+item.CellM;
        totalAmount=+item.CellSum;
      }
    })
    this.file.File.completed = checked;
    this.file.File.totalAmount = totalAmount.toString();
    this.file.File.totalItems = totalItems.toString();
  }

  saveFile(file: any){
    this.calculateChecked()

    this.userSub = this.invoiceService.updateFile(this.file.File.ID, this.file.File).subscribe(
      resData => {
        if (resData.status) {
          this.updateTable(this.file?.File);
          console.log(resData);
          // Показать сообщение об успехе
          this.snackBar.open('Все записи успешно изменены', 'Закрыть', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
        } else {
          console.log(resData.message);
          this.error = this.handleErrorMessage(resData.message);
          // Показать сообщение об ошибке
          this.snackBar.open(this.error, 'Закрыть', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
        }
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        // Показать сообщение об ошибке
        this.snackBar.open(this.error, 'Закрыть', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      }
    );
  }


  private handleErrorMessage(errorRes: string) {
    let errorMessage = 'Неизвестная ошибка. Обратитесь к Администратору';
    if (!errorRes) {
      return errorMessage;
    }
    switch (errorRes) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Этот email уже существует';
        break;
      case 'Invalid login credentials. Please try again':
        errorMessage = 'Неверный логин или пароль!';
        break;
      case 'User Name address not found':
        errorMessage = 'Неверный логин или пароль!';
        break;
    }
    return errorMessage;
  }

 // Method to update the original values of each record
 updateOriginalValues(): void {
  this.file?.File.records.forEach(record => {
    record.originalCellO = record.CellO;
    record.originalCellSEND = record.CellSEND;
  });
}
  generateRandomNumber(): number {
    return Math.floor(Math.random() * 1000) + 1; // Generate random number between 1 and 1000
  }

  // Method to check if the row record has been edited
  isRowEdited(element: any): boolean {
    return element.CellO !== element.originalCellO || element.CellSEND !== element.originalCellSEND;
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
