import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { UsersComponent } from './users/users.component';
import { InvoicePdfComponent } from './invoice-pdf/invoice-pdf.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { MatMenuModule } from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';

import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';

import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileTableComponent } from './file-table/file-table.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AuthComponent } from './auth/auth.component';
import { FileSizePipe } from './file-size.pipe';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { MatTreeModule } from '@angular/material/tree';
import { DeleteUserConfirmationDialogComponent } from './delete-user-confirmation-dialog/delete-user-confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReportsComponent } from './reports/reports.component';
import { ReportDetailComponent } from './report-detail/report-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    InvoicePdfComponent,
    NotFoundPageComponent,
    AppHeaderComponent,
    FileTableComponent,
    AuthComponent,
    FileSizePipe,
    EditUserDialogComponent,
    AddUserDialogComponent,
    DeleteUserConfirmationDialogComponent,
    ReportsComponent,
    ReportDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatPaginatorModule,
    MatSortModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDividerModule,
    MatProgressBarModule,
    MatInputModule,
    MatTableModule,
    MatExpansionModule,
    MatTreeModule,
    MatDialogModule,
    MatCheckboxModule,
    MatListModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }