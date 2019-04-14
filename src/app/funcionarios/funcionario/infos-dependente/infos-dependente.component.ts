import { ActivatedRoute } from '@angular/router';
import { Dependente } from './dependente.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FuncionariosService } from '../../funcionarios.service';
import { DialogConfirmService } from 'src/app/residentes/dialog-confirm.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'salv-infos-dependente',
  templateUrl: './infos-dependente.component.html'
})
export class InfosDependenteComponent implements OnInit {

  @Input() dependente: Dependente
  @Output() _dependentes = new EventEmitter()
  updateDependenteForm: FormGroup

  estados = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
  ];

  constructor(private dcs: DialogConfirmService, private fs: FuncionariosService, private ns: NotificationService, private fb: FormBuilder, private spinner: NgxSpinnerService) { }

  ngOnInit() {
  
    this.updateDependenteForm = this.fb.group({
      NOME: this.fb.control(null, []),
      SOBRENOME: this.fb.control(null, []),
      DATA_NASCIMENTO: this.fb.control(null, []),
      RG: this.fb.control(null, []),
      CPF: this.fb.control(null, []),
      NUMERO_CERTIDAO_NASCIMENTO: this.fb.control(null, []),
      FOLHA_CERTIDAO_NASCIMENTO: this.fb.control(null, []),
      LIVRO_CERTIDAO_NASCIMENTO: this.fb.control(null, []),
      CIDADE_CERTIDAO_NASCIMENTO: this.fb.control(null, []),
      ESTADO_CERTIDAO_NASCIMENTO: this.fb.control(null, [])
      
    })
  }

  deleteDependente(_dep_nome: string, _dep_sobrenome: string): void {
    this.dcs.confirm('Deseja excluir o dependente?').then((isTrue) => {
      if (isTrue) {
        this.fs.deleteDependente(_dep_nome, _dep_sobrenome).subscribe(() => {
          this._dependentes.emit(true)
          this.ns.notify('Dependente excluído com sucesso!')
        })
      }
    })
  }

  buscaDependente(_cod_fun, _dep_nome, _dep_sobrenome) {
    this.fs.dependenteId(_cod_fun, _dep_nome, _dep_sobrenome).subscribe(dependente => {
      this.updateDependenteForm.patchValue({
        NOME: dependente[0].NOME,
        SOBRENOME: dependente[0].SOBRENOME,
        DATA_NASCIMENTO: dependente[0].DATA_NASCIMENTO,
        RG: dependente[0].RG,
        CPF: dependente[0].CPF,
        NUMERO_CERTIDAO_NASCIMENTO: dependente[0].NUMERO_CERTIDAO_NASCIMENTO,
        FOLHA_CERTIDAO_NASCIMENTO: dependente[0].FOLHA_CERTIDAO_NASCIMENTO,
        LIVRO_CERTIDAO_NASCIMENTO: dependente[0].LIVRO_CERTIDAO_NASCIMENTO,
        CIDADE_CERTIDAO_NASCIMENTO: dependente[0].CIDADE_CERTIDAO_NASCIMENTO,
        ESTADO_CERTIDAO_NASCIMENTO: dependente[0].ESTADO_CERTIDAO_NASCIMENTO
      })
    })
  }

  updateDependente(id_, nome_, sobrenome_, dependente) {
    this.fs.updateDependente(id_, nome_, sobrenome_, dependente).subscribe(res => {
      this._dependentes.emit(true)
      this.ns.notify('Dependente alterado com sucesso!')
    })
  }

}
