import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators'
import { catchError } from 'rxjs/operators'
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivos/subir-archivo.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu : any = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    console.log('servicio de usuario listo')
    this.cargarStorage();
  }

  renuevaToken() {
    let url = URL_SERVICIOS + '/login/renuevatoken'
    url += '?token=',this.token;
    console.log(url);
    return this.http.get( url )
    .pipe(map( (resp: any) =>{
      this.token = resp.token;
      localStorage.setItem('token', this.token);
      console.log('token renovado');
    }),catchError( err => {
      swal( 'No se pudo renovar token', 'no fue posible renovar el token' ,'error' );
      this.router.navigate(['/login']);
      return throwError(err)
    }));
  }
  
      

  loginGoogle( token:string) {
    let url = URL_SERVICIOS + '/login/google';
    return this.http.post( url, { token } )
    .pipe(map( (resp:any) => {
      this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu );
      console.log(resp);
      return true;
    }));
  }

  guardarStorage( id: string, token: string, usuario: Usuario, menu: any ){

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
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
      console.log(resp);
        this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu );
        return true;
    }),
    catchError( err => {
      swal( 'Error en el login', `${err.error.msj}` ,'error' )
      return throwError(err)
    }));
  }

  crearUsuario( usuario: Usuario ) {
    let url = URL_SERVICIOS +'/usuario';
    return this.http.post(url, usuario)
    .pipe(map( (resp:any) => {
        swal('Usuario creado: ', resp.usuario.email, 'success');     
        return resp.usuario;
    }),
    catchError( err => {
      console.log( err ) 
      swal('Error' ,`${err.error.errors.errors.email.message}` ,'error' )
      return throwError(err)
    }));
  }

  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  logOut() {
    this.usuario = null;
    this.token = ' ';
    this.menu = [];
    
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  actualizarUsuario( usuario: Usuario ) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    
    return this.http.put( url, usuario )
      .pipe(map( ( resp: any ) => {
        if ( usuario._id === this.usuario._id ) {
          let usuarioDB: Usuario = resp.usuario;
          this.guardarStorage( resp.usuario._id, this.token, usuarioDB, this.menu)
        } 
        swal('Usuario actualizado: ', resp.usuario.nombre, 'success');
        return true;     
      }))
  }

  cambiarImagen( archivo: File, id: string ) {
    this._subirArchivoService.subirArchivo( archivo, 'usuarios', id )
      .then( (resp: any)=> {
        this.usuario.img = resp.usuario.img;
        swal( 'Usuario actualizado', this.usuario.nombre + '', 'success' );
        this.guardarStorage( id, this.token, this.usuario, this.menu );
      })
      .catch( resp => {
        console.log(resp);
      })
  }

  cargarUsuarios( desde: number = 0 ){
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get( url );
  }

  buscarUsuarios ( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get( url )
      .pipe( map ( (resp : any) => resp.usuarios));
  }

  borrarUsuario ( id: string ) {
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;
    return this.http.delete( url )
      .pipe(map( resp => {
        swal("Usuario borrado","el usuario ha sido eliminado correctamente","success");
        return true;
      }));
  }
}