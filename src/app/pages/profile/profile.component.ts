import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;
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

}
