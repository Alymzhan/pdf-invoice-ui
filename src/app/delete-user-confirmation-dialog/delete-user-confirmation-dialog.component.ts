import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-user-confirmation-dialog',
  templateUrl: './delete-user-confirmation-dialog.component.html',
  styleUrls: ['./delete-user-confirmation-dialog.component.css']
})
export class DeleteUserConfirmationDialogComponent {
  
  constructor(
    public dialogRef: MatDialogRef<DeleteUserConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: any
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dialogRef.close(true);
  }
}
