import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { UploadedFile } from '../models/uploadFiles.model';
import { Subject } from 'rxjs';



@Injectable({ providedIn: 'root' })

export class InvoicePDFService {
    filesChanged = new Subject<UploadedFile[]>();

    private files: UploadedFile[] = [];
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  sendFile(files: UploadedFile[]) {
    this.http
      .put(
        'https://invoice-pdf-ui-default-rtdb.firebaseio.com/uploadedFiles.json',
        files
      )
      .subscribe(response => {
        console.log(response);
      });
      this.filesChanged.next(this.files.slice());
  }

  getFiles() {
    return this.http
      .get<UploadedFile[]>(
        'https://invoice-pdf-ui-default-rtdb.firebaseio.com/uploadedFiles.json'
      )
      .pipe(
        map(files => {
          return files.map(files => {
            return {
              ...files,
            };
          });
        }),
        // tap(files => {
        //   this.recipeService.setRecipes(files);
        // })
      );
  }
}
