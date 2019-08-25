import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from 'src/app/models/medico.model';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  public totalMedicos: number = 0;
  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

    cargarMedico() {
      let url = URL_SERVICIOS + '/medico';
      return this.http.get( url )
        .pipe(map( (resp: any) =>{
          this.totalMedicos = resp.total;
          return resp.medicos;
        }))
    }

    guardarMedico( medico: Medico ) {
      let url = URL_SERVICIOS + '/medico/';
    
      if ( medico._id ) {
        url += medico._id;
        url += '?token=' + this._usuarioService.token;
        return this.http.put( url, medico )
        .pipe(map( (resp: any) =>{
          console.log(resp);
          swal('medico actualizado', resp.medico.nombre, 'success');
          return resp.medico
        }))
      } else {
        url += '?token=' + this._usuarioService.token;
        return this.http.post( url, medico )
          .pipe(map( (resp: any) =>{
            console.log(resp);
            swal('medico creado', resp.medico.nombre, 'success');
            return resp.medico
          }))
      }
    }

    buscarMedicos ( termino: string ) {
      let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
      return this.http.get( url )
        .pipe( map ( (resp : any) => {
          return resp.medicos
        }));
    }

    eliminarMedico( id: string ) {
      let url = URL_SERVICIOS + '/medico/' + id + '?token=' + this._usuarioService.token;
      return this.http.delete( url )
    }

    cargarMedicoId( id: string ) {
      let url = URL_SERVICIOS + '/medico/' + id;
      return this.http.get( url )
        .pipe(map( ( resp: any ) => {
          return resp.medico;
        }))
    }
}
