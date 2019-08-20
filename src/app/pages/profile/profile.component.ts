import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import { ThrowStmt } from '@angular/compiler';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string;

  constructor(
    public _usuarioService: UsuarioService
  ) {
    this.usuario = _usuarioService.usuario;
    console.log(this.usuario);
   }

  ngOnInit() {
  }

  save( usuario: Usuario ) {
    
    if ( !this.usuario.google ) {
      this.usuario.email = usuario.email;
    }
    
    this.usuario.nombre = usuario.nombre;
    this._usuarioService.actualizarUsuario( this.usuario )
      .subscribe()
  }
  
  seleccionImagen( archivo: File ) {
    if (!archivo){
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ) {
      swal('Solo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    } 



    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );
    reader.onloadend = () => {
      this.imagenTemp = reader.result;
    }

  }

  cambiarImagen() {
    this._usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id + '' );
  }
}
