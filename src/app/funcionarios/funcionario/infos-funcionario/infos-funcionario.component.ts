import { FormBuilder, FormGroup } from '@angular/forms';
import { Funcionario, Telefone, Endereco, Usuario } from './../../funcionario.model';
import { Component, OnInit, Input } from '@angular/core';
import { FuncionariosService } from '../../funcionarios.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { DialogConfirmService } from 'src/app/residentes/dialog-confirm.service';
@Component({
  selector: 'salv-infos-funcionario',
  templateUrl: './infos-funcionario.component.html'
})
export class InfosFuncionarioComponent implements OnInit {

  @Input() funcionario: Funcionario
  @Input() telefones: Telefone[]
  @Input() enderecos: Endereco[]
  novoTelefoneForm: FormGroup
  novoEnderecoForm: FormGroup
  novoUsuarioForm: FormGroup
  estados = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
  ];

  constructor(private fs: FuncionariosService, private fb: FormBuilder, private ns: NotificationService, private dcs: DialogConfirmService) { }

  ngOnInit(): void {
    this.novoTelefoneForm = this.fb.group({
      DDD: this.fb.control(null, []),
      NUMERO: this.fb.control(null, [])
    })
    this.novoEnderecoForm = this.fb.group({
      ENDERECO: this.fb.control(null, []),
      NUMERO: this.fb.control(null, []),
      BAIRRO: this.fb.control(null, []),
      COMPLEMENTO: this.fb.control(null, []),
      CIDADE: this.fb.control(null, []),
      ESTADO: this.fb.control('Selecione', []),
      CEP: this.fb.control(null, []),
      REFERENCIA: this.fb.control(null, []),
    })
    this.novoUsuarioForm = this.fb.group({
      EMAIL: this.fb.control(null, []),
      LOGIN: this.fb.control(null, []),
      SENHA: this.fb.control(null, [])
    })
  }

  novoTelefone(telefone: Telefone) {
    this.fs.novoTelefone(this.funcionario.PESSOA_CODIGO, telefone).subscribe(res => {
      this.fs.telefoneById(this.funcionario.PESSOA_CODIGO.toString()).subscribe(res => {
        this.telefones = res
        this.novoTelefoneForm.reset()
        this.ns.notify('Telefone inserido com sucesso!')
      })
    })
  }

  novoEndereco(endereco: Endereco) {
    this.fs.novoEndereco(this.funcionario.PESSOA_CODIGO, endereco).subscribe(res => {
      this.fs.enderecoById(this.funcionario.PESSOA_CODIGO.toString()).subscribe(res => {
        this.enderecos = res
        this.novoEnderecoForm.reset()
        this.ns.notify('Endereço inserido com sucesso!')
      })
    })
  }

  novoUsuario(usuario: Usuario) {
    this.fs.novoUsuario(this.funcionario.CODIGO_FUNCIONARIO, usuario).subscribe(res => {
      this.funcionario.USUARIO = res
      this.novoUsuarioForm.reset()
      this.ns.notify('Usuário inserido com sucesso!')
    })
  }

  haveLogin() {
    if (this.funcionario.USUARIO) {
      return true
    } else {
      return false
    }
  }

  deleteTelefone(_cod_pes: number, _cod_tel: number): void {
    this.dcs.confirm(`Deseja excluir o telefone?`).then((isTrue) => {
      if (isTrue) {
        this.fs.deleteTelefone(_cod_pes, _cod_tel).subscribe(() => {
          this.fs.telefoneById(this.funcionario.PESSOA.CODIGO.toString()).subscribe(response => {
            this.telefones = response
            this.ns.notify('Telefone excluído com sucesso!')
          })
        })
      }
    })
  }

  deleteEndereco(_cod_pes: number, _cod_end: number): void {
    this.dcs.confirm(`Deseja exluir o endereço?`).then((isTrue) => {
      if (isTrue) {
        this.fs.deleteEndereco(_cod_pes, _cod_end).subscribe(() => {
          this.fs.enderecoById(this.funcionario.PESSOA.CODIGO.toString()).subscribe(response => {
            this.enderecos = response
            this.ns.notify('Endereço excluído com sucesso!')
          })
        })
      }
    })
  }

}