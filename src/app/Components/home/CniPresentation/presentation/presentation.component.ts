import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css'],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])
  ]
})

export class PresentationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  flip: string = 'inactive';

  toggleFlip() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  }


  lireLaSuite()
  {
    window.open("http://www.cni.tn/index.php/fr/");
  }

}
