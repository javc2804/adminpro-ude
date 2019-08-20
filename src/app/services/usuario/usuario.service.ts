import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators'
import swal from 'sweetalert';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    console.log('servicio de usuario listo')
    this.cargarStorage();
  }

  loginGoogle( token:string) {
    let url = URL_SERVICIOS + '/login/google';
    return this.http.post( url, { token } )
    .pipe(map( (resp:any) => {
      this.guardarStorage( resp.id, resp.token, resp.usuario );
      return true;
    }));
  }

  guardarStorage( id: string, token: string, usuario: Usuario ){

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  login( usuario: Usuario, recordar: boolean = false ){
    if ( recordar ) {
      localStorage.setItem('email', usuario.email + '');
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS +'/login';
    return this.http.post( url, usuario )
    .pipe(map( (resp:any) => {
        this.guardarStorage( resp.id, resp.token, resp.usuario );
        return true;
    }));
  }

  crearUsuario( usuario: Usuario ) {
    let url = URL_SERVICIOS +'/usuario';
    return this.http.post(url, usuario)
    .pipe(map( (resp:any) => {
        swal('Usuario creado: ', resp.usuario.email, 'success');     
        return resp.usuario;
    }));
  }

  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  logOut() {
    this.usuario = null;
    this.token = ' ';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  actualizarUsuario( usuario: Usuario ) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    
    return this.http.put( url, usuario )
      .pipe(map( ( resp: any ) => {
        let usuarioDB: Usuario = resp.usuario;
        this.guardarStorage( resp.usuario._id, this.token, usuarioDB)
        swal('Usuario actualizado: ', resp.usuario.nombre, 'success');     
      }))
  }
}