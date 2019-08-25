import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { MedicoService } from 'src/app/services/service.index';
import { HospitalService } from 'src/app/services/hospital/hospital.service';
import { Medico } from 'src/app/models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/componets/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {
  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital ('');
  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public router: Router,
    public activated: ActivatedRoute,
    public _modalUploadServices: ModalUploadService
  ) { 
    activated.params.subscribe( params => {
      let id = params['id'];
      if (id !== 'nuevo') {
        this.cargarMedico( id );
      }
    });
  }

  ngOnInit() {
    this.medico.usuario = localStorage.getItem('id');
    this._hospitalService.cargarHospitales()
      .subscribe(( resp )=> this.hospitales = resp.hospitales );
    
    this._modalUploadServices.notificacion
      .subscribe( resp => {
        this.medico.img = resp.medico.img;
        console.log( this.medico.img );
      })
  }

  guardarMedico( f: NgForm ) {
    console.log(f.value);

    if ( f.invalid ) {
      return;
    }

    this._medicoService.guardarMedico( this.medico )
      .subscribe( ( medico )=>{
        this.medico._id = medico._id;
        this.router.navigate(['/medico',medico._id]);
      });
  }

  cambioHospital( id: string ) {
    this._hospitalService.obtenerHospital( id )
      .subscribe( (resp) => this.hospital = resp)
  }

  cargarMedico ( id: string ) {
    this._medicoService.cargarMedicoId( id )
      .subscribe( ( medico ) => {
        this.medico = medico;
        this.medico.hospital = medico.hospital._id;
        this.cambioHospital( this.medico.hospital );
      })
  }

 
  cambiarFoto( ) {
    this._modalUploadServices.mostrarModal( 'medicos', this.medico._id )
  }

}
