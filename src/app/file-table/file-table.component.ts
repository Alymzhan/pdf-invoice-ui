// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-file-table',
//   templateUrl: './file-table.component.html',
//   styleUrl: './file-table.component.css'
// })
// export class FileTableComponent {

// }


import { Component } from '@angular/core';

import {animate, state, style, transition, trigger} from '@angular/animations';

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

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
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
  styleUrl: './file-table.component.css',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class FileTableComponent {
  files = FILES_DATA;
  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['fileName', 'status', 'size'];
  columnsToDisplayWithExpand = ['expand', ...this.columnsToDisplay];
  
  expandedElement: any | null;

  // columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
  // columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  // expandedElement: any | null;

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

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`,
  },
  {
    position: 2,
    name: 'Helium',
    weight: 4.0026,
    symbol: 'He',
    description: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`,
  },
  {
    position: 3,
    name: 'Lithium',
    weight: 6.941,
    symbol: 'Li',
    description: `Lithium is a chemical element with symbol Li and atomic number 3. It is a soft,
        silvery-white alkali metal. Under standard conditions, it is the lightest metal and the
        lightest solid element.`,
  },
  {
    position: 4,
    name: 'Beryllium',
    weight: 9.0122,
    symbol: 'Be',
    description: `Beryllium is a chemical element with symbol Be and atomic number 4. It is a
        relatively rare element in the universe, usually occurring as a product of the spallation of
        larger atomic nuclei that have collided with cosmic rays.`,
  },
  {
    position: 5,
    name: 'Boron',
    weight: 10.811,
    symbol: 'B',
    description: `Boron is a chemical element with symbol B and atomic number 5. Produced entirely
        by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a
        low-abundance element in the Solar system and in the Earth's crust.`,
  },
  {
    position: 6,
    name: 'Carbon',
    weight: 12.0107,
    symbol: 'C',
    description: `Carbon is a chemical element with symbol C and atomic number 6. It is nonmetallic
        and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
        to group 14 of the periodic table.`,
  },
  {
    position: 7,
    name: 'Nitrogen',
    weight: 14.0067,
    symbol: 'N',
    description: `Nitrogen is a chemical element with symbol N and atomic number 7. It was first
        discovered and isolated by Scottish physician Daniel Rutherford in 1772.`,
  },
  {
    position: 8,
    name: 'Oxygen',
    weight: 15.9994,
    symbol: 'O',
    description: `Oxygen is a chemical element with symbol O and atomic number 8. It is a member of
         the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing
         agent that readily forms oxides with most elements as well as with other compounds.`,
  },
  {
    position: 9,
    name: 'Fluorine',
    weight: 18.9984,
    symbol: 'F',
    description: `Fluorine is a chemical element with symbol F and atomic number 9. It is the
        lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard
        conditions.`,
  },
  {
    position: 10,
    name: 'Neon',
    weight: 20.1797,
    symbol: 'Ne',
    description: `Neon is a chemical element with symbol Ne and atomic number 10. It is a noble gas.
        Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about
        two-thirds the density of air.`,
  },
];

