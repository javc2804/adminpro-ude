import { Injectable } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  constructor(
    public http: HttpClient,
  ) {

   }

  cargarHospitales(): any{ 
    let url = URL_SERVICIOS + '/hospital';
    return this.http.get( url )
  }

  crearHospital( hospital: Hospital ) {
    // let usuario = JSON.parse(localStorage.getItem('usuario'));
    let url = URL_SERVICIOS +'/hospital?token=' + localStorage.getItem('token');
    return this.http.post( url, hospital )
    .pipe(map( (resp:any) => {
        swal('Hospital creado: ', resp.hospital.nombre, 'success');     
        return resp.usuario;
    }));
  }

  actualizarHospital( hospital: Hospital ){
    let url = URL_SERVICIOS +'/hospital/' + hospital._id + '?token=' + localStorage.getItem('token');
    return this.http.put( url, hospital )
    .pipe(map( (resp:any) => {
        swal('Hospital actualizado: ', resp.hospital.nombre, 'success');     
        return resp.hospital;
    }));
  }

  eliminarHospital( id: string) {
    let url = URL_SERVICIOS +'/hospital/' + id + '?token=' + localStorage.getItem('token');
    return this.http.delete( url )
    .pipe(map( (resp:any) => {
        swal('Hospital eliminado: ','se elimino correctamente','success');     
        return resp;
    }));
  }

  buscarHospital( termino: string ){
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get( url )
    .pipe(map( (resp:any) => {
      return resp;
  }));
  }

  obtenerHospital( id: string ) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get( url )
    .pipe(map( (resp:any) => {
      return resp.hospital;
  }));
  } 
}
