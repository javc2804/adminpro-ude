import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  subirArchivo( archivo: File, tipo: string, id: string ) {
    return new Promise( (resolve, reject) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();
      formData.append( 'imagen', archivo, archivo.name );
      xhr.onreadystatechange = function() {
        if ( xhr.readyState === 4 ) {
          if ( xhr.status === 200 ) {
            console.log('imagen subida');
            resolve( xhr.response );
          } else {
            console.log('fallo la subida');
            reject ( xhr.response );
          }
        }
      };
    })
  }
}
