import { Injectable, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { AuthService } from '../auth/auth.service';
import { UploadedFile } from '../models/uploadFiles.model';
import { Subject } from 'rxjs';
import { FileResponseData, Files, OneFileResponseData, UploadFileResponseData } from '../models/files.model';

@Injectable({ providedIn: 'root' })

export class InvoicePDFService {
    filesChanged = new Subject<UploadedFile[]>();

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {}

    sendFile(formData: FormData) {
        return this.http
        .post<UploadFileResponseData>(
            '/api/upload',
            formData,
        );
        // .subscribe(response => {
        //     // this.filesChanged.next(this.files.slice());
        // });
    }

    getFiles(id: number) {
        return this.http
        .get<FileResponseData>(
            `/api/getDashboard/${id}`
        );
    }

    updateFile(id: number, body: Files) {
        return this.http
        .put<OneFileResponseData>(
            `/api/files/file/${id}`, body
        );
    }

    getFile(id: number) {
        return this.http
        .get<OneFileResponseData>(
            `/api/files/file/${id}`
        );
    }

    downloadFile(filename: string) {
        return this.http
        .get(
            `/api/files/${filename}`, { responseType: 'blob' }
        );
    }
}
