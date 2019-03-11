import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( public _ajustes: SettingsService) { }

  ngOnInit() {
  }

  cambiarColor(thema: string, link: any) {
    console.log(link);
    this.aplicarCheck(link);
    this._ajustes.aplicarTema( thema );
  }

  aplicarCheck(link: any) {
    const selectores: any = document.getElementsByClassName('selector');
    for (const ref of selectores) {
      ref.classList.remove('working');
      link.classList.add('working');
    }
  }

}
