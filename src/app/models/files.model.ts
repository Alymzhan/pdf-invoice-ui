export class Files {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    fileName: string;
    originalFileName: string;
    status: string;
    size: number;
    isActive: boolean;
    userid: number;
    files: GeneratedFile[] | null;
    contentType: string;
    region: string;
    records: Records[];
    totalRecords: number;
    completed: number;
    totalItems: number;
    totalAmount: number;
    registerNumber: string;
    registerDate: string;
    contactDate: string;
    titleInfo: string;
  }

  export interface Records {
    CellA: string;
    CellB: string;
    CellC: string;
    CellD: string;
    CellE: string;
    CellF: string;
    CellG: string;
    CellH: string;
    CellI: string;
    CellJ: string;
    CellK: string;
    CellL: string;
    CellM: string;
    CellN: string;
    CellO: string;
    CellP: string;
    CellH1: string;
    CellH2: string;
    CellH3: string;
    CellH4: string;
    CellH5: string;
    CellH6: string;
    CellH7: string;
    CellH8: string;
    CellH9: string;
    CellL1: string;
    CellL2: string;
    CellL3: string;
    CellL4: string;
    CellL5: string;
    CellL6: string;
    CellH10: string;
    CellH11: string;
    CellBINIT: string;
    CellPRICE: string;
    CellSEND: boolean | true;
    originalCellO: string;
    originalCellSEND: boolean;
  }
  
  export class GeneratedFile {
    size: number;
    status: string;
    fileName: string;
    isActive: boolean;
    contentType?: string;
  }
  
  export class FileResponseData {
    Files: Files[];
    message: string;
    status: boolean;
  }

  export class OneFileResponseData {
    File: Files;
    message: string;
    status: boolean;
  }

  export class UploadFileResponseData {
    File: Files;
    message: string;
    status: boolean;
  }
  