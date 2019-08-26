import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService, SidebarService, SharedService } from './service.index';
import { UsuarioService } from './usuario/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginGuardGuard } from './guard/login-guard.guard';
import { AdminGuard } from './guard/admin.guard';
import { SubirArchivoService } from './subir-archivos/subir-archivo.service';
import { ModalUploadService } from '../componets/modal-upload/modal-upload.service';
import { MedicoService } from './medico/medico.service'
import { VerificatokenGuard } from './guard/verificatoken.guard';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    LoginGuardGuard,
    AdminGuard,
    VerificatokenGuard,
    SubirArchivoService,
    ModalUploadService,
    MedicoService,
  ],
  declarations: []
})
export class ServiceModule { }
