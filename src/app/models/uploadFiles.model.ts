import { GeneratedFile } from "./generatedFiles.model";

export class UploadedFile {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  fileName: string;
  status: string;
  size: number;
  isActive: boolean;
  userid: number;
  generatedFiles: GeneratedFile[] | null;
  contentType: string;

  constructor(
    id: number,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
    fileName: string,
    status: string,
    size: number,
    isActive: boolean,
    userid: number,
    generatedFiles: GeneratedFile[] | null,
    contentType: string
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
    this.fileName = fileName;
    this.status = status;
    this.size = size;
    this.isActive = isActive;
    this.userid = userid;
    this.generatedFiles = generatedFiles;
    this.contentType = contentType;
  }
}
