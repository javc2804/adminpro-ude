import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/service.index';
declare var swal: any;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  constructor(
    public _medicosServive: MedicoService
  ) {
    this.cargarMedicos();
   }
  medicos: Medico[] = []
  ngOnInit() {
  }

  cargarMedicos() {
    this._medicosServive.cargarMedico()
      .subscribe( ( medicos ) => this.medicos = medicos);
  }

  buscarMedico( termino: string ) {
    if ( termino.length <= 0 ) {
      this.cargarMedicos();
      return
    }
    this._medicosServive.buscarMedicos( termino )
      .subscribe( (resp) =>{
        this.medicos = resp;
      })
  }

  borrarMedico( id: string ) {
    swal({
      title: "¿Estas seguro?",
      text: 'Esta apunto de borrar a un medico ',
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then( borrar => {
      if ( borrar ) {
        this._medicosServive.eliminarMedico( id )
          .subscribe( ( borrado: boolean ) => {
            console.log(borrado);
            this.cargarMedicos();
          })
      } 
    });
  }
}
