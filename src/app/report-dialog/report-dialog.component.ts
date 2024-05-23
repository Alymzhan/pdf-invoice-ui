import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CityService } from '../shared/city.service';
import { Files } from '../models/files.model';

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrl: './report-dialog.component.css'
})
export class ReportDialogComponent {
  file: Files; // Assuming this is the user data passed from the parent component
  allRegions = this.cityService.cities; // Define your array of all regions
  userRegions: { [key: string]: boolean } = {}; // Object to store the user's selected regions
  hide = true;

  constructor(
    private cityService: CityService,
    public dialogRef: MatDialogRef<ReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.file = { ...data.file }; // Make a copy of the user data to avoid modifying the original data
    // console.log('this.file', this.file);
    const filteredCity = this.allRegions.find(city => city.value === this.file.region);
    // Emit the updated file data and close the dialog
    if (this.file.titleInfo == "" && filteredCity?.titleInfo){
      this.file.titleInfo=filteredCity?.titleInfo;
      this.file.contractDate=filteredCity?.contractData;
    }
  }

  onSave(): void {
    this.dialogRef.close(this.file);
  }

  onCancel(): void {
    // Close the dialog without saving changes
    this.dialogRef.close();
  }
}
