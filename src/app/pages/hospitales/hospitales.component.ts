import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/services/hospital/hospital.service';
import { Hospital } from 'src/app/models/hospital.model';
import { ModalUploadService } from 'src/app/componets/modal-upload/modal-upload.service';
declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
  public hospitales: Hospital[] = []
  public totalRegistros: number;
  constructor(
    public _hospitalServices: HospitalService,
    public _modalUploadServices: ModalUploadService
  ) { 
    this.cargarHospitales();
  }
 
  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadServices.notificacion
      .subscribe( resp => this.cargarHospitales());
  }

  cargarHospitales(){
    return this._hospitalServices.cargarHospitales()
      .subscribe( ( resp: any ) =>{
        console.log(resp);
        this.totalRegistros = resp.total;
        this.hospitales = resp.hospitales;
      })
  }

  mostrarModal( id: string ) {
    this._modalUploadServices.mostrarModal( 'hospitales', id );
  }

  crearHospital(){
    swal("Ingrese el nombre del hospital", {content: "input"})
    .then(( nombre ) => {
      if ( !nombre || nombre.length === 0 ) {
        return;
      }
      let hospital = new Hospital( nombre );
      this._hospitalServices.crearHospital( hospital )
      .subscribe( ( resp ) =>{
      })
    });
  }

  guardarHospital( hospital: Hospital ) {
    swal({
      title: "¿Estas seguro?",
      text: 'Esta apunto de actualizar al' + hospital.nombre,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then( actualizar => {
      if ( actualizar ) {
        this._hospitalServices.actualizarHospital( hospital )
          .subscribe( ( actualizar: boolean ) => {
            console.log(actualizar);
            this.cargarHospitales();
          })
      } 
    });
  }
  
  borrarHospital( id: string ) {
    this._hospitalServices.eliminarHospital( id )
      .subscribe( ( eliminado ) => this.cargarHospitales())
  }

  buscarHospital(termino: string) {
    if (termino.length <= 0) {
      this.cargarHospitales();
      return
    }
    this._hospitalServices.buscarHospital( termino )
      .subscribe(( resp )=>{
        this.hospitales = resp.hospitales;
      })
  }
}
