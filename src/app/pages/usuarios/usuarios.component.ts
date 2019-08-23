import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import { ModalUploadService } from 'src/app/componets/modal-upload/modal-upload.service';
declare var swal: any;
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde: number = 0;
  cargando: boolean = true;
  totalRegistros: number = 0;
  constructor(
    public _usuarioServices: UsuarioService,
    public _modalUploadServices: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadServices.notificacion
      .subscribe( resp => this.cargarUsuarios());
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioServices.cargarUsuarios( this.desde )
    .subscribe( (resp: any) => {
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;
      this.cargando = false;
    })
  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor;
    console.log( desde );
    if ( desde >= this.totalRegistros) {
      return;
    }
    if ( desde < 0 ) {
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario ( termino: string ) {
    console.log( termino );
    if ( termino.length <= 0 ) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this._usuarioServices.buscarUsuarios( termino )
      .subscribe( ( usuarios: any ) => {
        console.log(usuarios);
        this.usuarios = usuarios;
        this.cargando = false;
      })
  }

  borrarUsuario( usuario: Usuario ) {
    if ( usuario._id === this._usuarioServices.usuario._id ) {
      swal('No se puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    } 

    swal({
      title: "¿Estas seguro?",
      text: 'Esta apunto de borrar a' + usuario.nombre,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then( borrar => {
      if ( borrar ) {
        let idUser: any = usuario._id;
        this._usuarioServices.borrarUsuario( idUser )
          .subscribe( ( borrado: boolean ) => {
            console.log(borrado);
            this.cargarUsuarios();
          })
      } 
    });
  }

  guardarUsuario( usuario: Usuario ) {
    swal({
      title: "¿Estas seguro?",
      text: 'Esta apunto de actualizar a' + usuario.nombre,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then( actualizar => {
      if ( actualizar ) {
        this._usuarioServices.actualizarUsuario( usuario )
          .subscribe( ( actualizar: boolean ) => {
            console.log(actualizar);
            this.cargarUsuarios();
          })
      } 
    });
  }
 
  mostrarModal( id: string ) {
    this._modalUploadServices.mostrarModal( 'usuarios', id );
  }

}
