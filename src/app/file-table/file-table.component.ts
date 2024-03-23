// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-file-table',
//   templateUrl: './file-table.component.html',
//   styleUrl: './file-table.component.css'
// })
// export class FileTableComponent {

// }


import { Component } from '@angular/core';

export interface FileData {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  fileName: string;
  status: string;
  size: number;
  isActive: boolean;
  userid: number;
  files: SubFileData[] | null;
  contentType: string;
}

export interface SubFileData {
  size: number;
  status: string;
  fileName: string;
  isActive: boolean;
  contentType?: string;
}

@Component({
  selector: 'app-file-table',
  templateUrl: './file-table.component.html',
  styleUrls: ['./file-table.component.css']
})

export class FileTableComponent {
  files = FILES_DATA;
  columnsToDisplay = ['fileName', 'status', 'size'];
  expandedElement: any | null;

  toggleRow(element: any): void {
    this.expandedElement = this.expandedElement === element ? null : element;
  }

  isExpansionDetailRow = (index: number, row: FileData) => row.files != null && this.expandedElement === row;

}

const FILES_DATA = [
  {
      "ID": 8,
      "CreatedAt": "2024-03-21T16:59:16.599-07:00",
      "UpdatedAt": "2024-03-21T17:01:15.431-07:00",
      "DeletedAt": null,
      "fileName": "1711065556.xlsx",
      "status": "Complete",
      "size": 23705,
      "isActive": false,
      "userid": 2,
      "files": [
          {
              "size": 4087170,
              "status": "Generated",
              "fileName": "1711065613504.pdf",
              "isActive": true
          },
          {
              "size": 4087170,
              "status": "Generated",
              "fileName": "1711065669666.pdf",
              "isActive": true
          },
          {
              "size": 832696,
              "status": "Generated",
              "fileName": "1711065671764.pdf",
              "isActive": true
          }
      ],
      "contentType": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  },
  {
      "ID": 9,
      "CreatedAt": "2024-03-22T06:53:50.608-07:00",
      "UpdatedAt": "2024-03-22T06:56:35.298-07:00",
      "DeletedAt": null,
      "fileName": "1711115630.xlsx",
      "status": "Complete",
      "size": 23705,
      "isActive": false,
      "userid": 2,
      "files": [
          {
              "size": 4087170,
              "status": "Generated",
              "fileName": "1711115710322.pdf",
              "isActive": true,
              "contentType": "application/pdf"
          },
          {
              "size": 4087170,
              "status": "Generated",
              "fileName": "1711115787594.pdf",
              "isActive": true,
              "contentType": "application/pdf"
          },
          {
              "size": 832696,
              "status": "Generated",
              "fileName": "1711115790695.pdf",
              "isActive": true,
              "contentType": "application/pdf"
          }
      ],
      "contentType": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  },
  {
      "ID": 10,
      "CreatedAt": "2024-03-22T07:03:18.26-07:00",
      "UpdatedAt": "2024-03-22T07:03:18.26-07:00",
      "DeletedAt": null,
      "fileName": "1711116198.xlsx",
      "status": "Pending",
      "size": 23705,
      "isActive": false,
      "userid": 2,
      "files": null,
      "contentType": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  },
  {
      "ID": 11,
      "CreatedAt": "2024-03-22T07:03:24.177-07:00",
      "UpdatedAt": "2024-03-22T07:03:24.177-07:00",
      "DeletedAt": null,
      "fileName": "1711116204.xlsx",
      "status": "Pending",
      "size": 23705,
      "isActive": false,
      "userid": 2,
      "files": null,
      "contentType": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  }
];

