import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafica-dona',
  templateUrl: './grafica-dona.component.html',
  styles: []
})
export class GraficaDonaComponent implements OnInit {
@Input() data;
@Input() labels;
@Input() chartType;
@Input() leyenda;
  constructor() { }

  ngOnInit() {
  }

}
