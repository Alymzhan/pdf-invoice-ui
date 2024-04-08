import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CityService } from '../shared/city.service';
import { Config } from '../models/user.model';


interface NewUser {
  name: string;
  userName: string,
  phone_number?: string,
  password?: string,
  config?: Config
}

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent {
  hide: boolean = true;
  user: NewUser = {
    name: '',
    userName: '',
    phone_number: '',
    password: '',
    config: {region:[], roles:['Manager']},
  };
  allRegions = this.cityService.cities; // Define your array of all regions
  userRegions: { [key: string]: boolean } = {}; // Object to store the user's selected regions
  

  constructor(private cityService: CityService, public dialogRef: MatDialogRef<AddUserDialogComponent>) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(newUser: any): void {
    // Extract the keys (regions) where the value is true
    const userSelectedRegions: string[] = Object.keys(this.userRegions).filter(region => this.userRegions[region]);

    newUser.config.region = userSelectedRegions;

    // Handle saving the new user data
    console.log('newUser', newUser);
    this.dialogRef.close(newUser);
  }
}
