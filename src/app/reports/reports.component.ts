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
import { ReportDialogComponent } from '../report-dialog/report-dialog.component';


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
  private fileSub: Subscription;
  user: User | null;
  randomPercent: number;
  fileId: number = 0;
  file: OneFileResponseData;
  panelOpenState = true;
  error: string;

  constructor(private invoiceService: InvoicePDFService,
    private authService: AuthService,
    private cityService: CityService,
    private dialog: MatDialog, 
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
      console.log('files.Files', files.Files);
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
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
    
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

  openReport(file: Files): void {
    const dialogRef = this.dialog.open(ReportDialogComponent, {
      width: '400px',
      data: { file }
    });

    this.subscription = dialogRef.afterClosed().subscribe(updatedFile => {
      // // Обработка результата после закрытия диалогового окна
      if (updatedFile) {
        // console.log('updatedFile', updatedFile);
        // // Добавление нового пользователя в список пользователей или выполнение других действий
        this.invoiceService.updateFile(updatedFile.ID, updatedFile).subscribe(
          resData => {
            if (resData.status) {
              // console.log(resData);
              this.generateReport(updatedFile)
              // Показать сообщение об успехе
              this.snackBar.open('Все записи успешно изменены', 'Закрыть', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
              });
            } else {
              // console.log(resData.message);
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
            // console.log(errorMessage);
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
    });
  }

  generateReport(file: Files): void {
    const filteredRecords = file.records.filter(record => record.CellSEND);
    file.records = filteredRecords;

    this.subscription = this.invoiceService.generateReport(file).subscribe(
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
}
