import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagesHandlerService {

  constructor() { }

  public onFileSelect(args): File {
    return args.target.files[0];
  }
}
