export class Files {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    fileName: string;
    status: string;
    size: number;
    isActive: boolean;
    userid: number;
    files: GeneratedFile[] | null;
    contentType: string;
    region: string;
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

  export class UploadFileResponseData {
    File: Files;
    message: string;
    status: boolean;
  }
  