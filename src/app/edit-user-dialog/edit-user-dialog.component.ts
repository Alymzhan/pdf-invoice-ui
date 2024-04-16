import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CityService } from '../shared/city.service';
import { Users } from '../models/user.model';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent {
  user: Users; // Assuming this is the user data passed from the parent component
  allRegions = this.cityService.cities; // Define your array of all regions
  userRegions: { [key: string]: boolean } = {}; // Object to store the user's selected regions
  hide = true;

  constructor(
    private cityService: CityService,
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.user = { ...data.user }; // Make a copy of the user data to avoid modifying the original data

    // Assume these are the user's selected regions received from API
    const selectedRegions: string[] = this.user.config?.region;

    // Initialize userRegions object with the selected regions
    this.allRegions.forEach(region => {
      if(selectedRegions?.includes('All')) {
        this.userRegions[region.value] = true;
      }
      else {
        this.userRegions[region.value] = selectedRegions?.includes(region.value);
      }
    });
  }

  onSave(): void {
    // Emit the updated user data and close the dialog
    this.dialogRef.close(this.user);
  }

  onCancel(): void {
    // Close the dialog without saving changes
    this.dialogRef.close();
  }
}
