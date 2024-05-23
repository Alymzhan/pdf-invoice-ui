import { Component } from '@angular/core';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-report-excel',
  templateUrl: './report-excel.component.html',
  styleUrl: './report-excel.component.css'
})
export class ReportExcelComponent {
  selectedFilePath: string | null = null

  constructor() { }

  onFileSelected(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: any = fileList[0];
      this.selectedFilePath = file.path; // Store the selected file path
    }

    // console.log('fileList', fileList);

    let file = event.target.files[0];  
  
    // console.log('file', file);   
    let fileReader = new FileReader();    

    fileReader.onload = (e) => {    
        let arrayBuffer = fileReader.result;   
        if (arrayBuffer instanceof ArrayBuffer) { // Check if result is an ArrayBuffer
            var data = new Uint8Array(arrayBuffer);    
            var arr = new Array();    
            for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);    
            var bstr = arr.join("");    
            var workbook = XLSX.read(bstr, {type:"binary"});    
             // Get the first worksheet
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
        
            // Update existing cell values or add new data
            worksheet['A1'] = 'Updated Value';
            worksheet['B1'] = { v: 100, t: 'n' }; // Example of updating a numeric value
        
            // Save the updated workbook to a new file
            XLSX.writeFile(workbook, '/Users/alymzhan/Desktop/1111.xlsx');
            var first_sheet_name = workbook.SheetNames[0];    
            // var worksheet = workbook.Sheets[first_sheet_name];       
            // console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));    
            var arraylist = XLSX.utils.sheet_to_json(worksheet,{raw:true});     
            let filelist: any = [];   
            // console.log(filelist);
        } else {
            console.error("File is not an ArrayBuffer.");
        }
    }

    fileReader.readAsArrayBuffer(file);

    // let file= event.target.files[0];     
    // let fileReader = new FileReader();    
    // fileReader.readAsArrayBuffer(file);     
    // fileReader.onload = (e) => {    
    //     let arrayBuffer = fileReader.result;   
    //     if (arrayBuffer) {
    //       var data = new Uint8Array(arrayBuffer);    
    //     var arr = new Array();    
    //     for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);    
    //     var bstr = arr.join("");    
    //     var workbook = XLSX.read(bstr, {type:"binary"});    
    //     var first_sheet_name = workbook.SheetNames[0];    
    //     var worksheet = workbook.Sheets[first_sheet_name];    
    //     console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));    
    //       var arraylist = XLSX.utils.sheet_to_json(worksheet,{raw:true});     
    //           let filelist: any = [];    
    //           console.log(filelist)    
    //     } 
        
       
  }

  async generateExcelReport() {
      // Load the existing Excel file
        const workbook = XLSX.readFile('/Users/alymzhan/Desktop/file.xlsx');
  
        // Get the first worksheet
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
    
        // Update existing cell values or add new data
        worksheet['A1'].v = 'Updated Value';
        worksheet['B1'] = { v: 100, t: 'n' }; // Example of updating a numeric value
    
        // Save the updated workbook to a new file
        XLSX.writeFile(workbook, '/Users/alymzhan/Desktop/filecopy.xlsx');
  }

//   addfile(event)     
//   {    
//   this.file= event.target.files[0];     
//   let fileReader = new FileReader();    
//   fileReader.readAsArrayBuffer(this.file);     
//   fileReader.onload = (e) => {    
//       this.arrayBuffer = fileReader.result;    
//       var data = new Uint8Array(this.arrayBuffer);    
//       var arr = new Array();    
//       for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);    
//       var bstr = arr.join("");    
//       var workbook = XLSX.read(bstr, {type:"binary"});    
//       var first_sheet_name = workbook.SheetNames[0];    
//       var worksheet = workbook.Sheets[first_sheet_name];    
//       console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));    
//         var arraylist = XLSX.utils.sheet_to_json(worksheet,{raw:true});     
//             this.filelist = [];    
//             console.log(this.filelist)    
    
//   }    
// }

}
