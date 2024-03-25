import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { AuthService } from '../auth/auth.service';
import { UploadedFile } from '../models/uploadFiles.model';
import { Subject } from 'rxjs';
import { FileResponseData, UploadFileResponseData } from '../models/files.model';

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
        //     console.log(response);
        //     // this.filesChanged.next(this.files.slice());
        // });
    }

    getFiles() {
        return this.http
        .get<FileResponseData>(
            '/api/getDashboard/1'
        );
    }
}
