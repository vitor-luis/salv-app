import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TelaInicialService } from '../tela-inicial.service';
import { ProvaDeVida } from './prova-de-vida.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'salv-prova-de-vida',
  templateUrl: './prova-de-vida.component.html',
  styleUrls: ['./prova-de-vida.component.css'],
  animations: [
    trigger('prova-de-vidaAppeared', [
      state('ready', style({opacity: 1})),
      transition('void => ready', [
        style({opacity: 0, transform: 'translate(-30px, -10px)'}),
        animate('500ms 0s ease-in-out')
      ])
    ])
  ]
})
export class ProvaDeVidaComponent implements OnInit {

  provadevidaState = 'ready'

  provaDeVidas: ProvaDeVida[]

  constructor(private telaInicialService: TelaInicialService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
   this.telaInicialService.provaDeVida()
   .subscribe(data => {
    this.provaDeVidas = data
    this.spinner.hide()
   })
  }

}
