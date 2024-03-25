export class GeneratedFile {
    size: number;
    status: string;
    fileName: string;
    isActive: boolean;
    contentType?: string;
  
    constructor(
      size: number,
      status: string,
      fileName: string,
      isActive: boolean,
      contentType?: string
    ) {
      this.size = size;
      this.status = status;
      this.fileName = fileName;
      this.isActive = isActive;
      this.contentType = contentType;
    }
  }

  
  