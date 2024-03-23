import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoicePdfComponent } from './invoice-pdf/invoice-pdf.component';
import { UsersComponent } from './users/users.component';
import { FileTableComponent } from './file-table/file-table.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'auth', component: AuthComponent, },
  { path: 'invoice', component: InvoicePdfComponent, canActivate: [AuthGuard], },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard], },
  {path: 'table', component: FileTableComponent, canActivate: [AuthGuard],},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }