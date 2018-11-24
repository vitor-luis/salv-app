import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { ROUTES } from "./app.routes";

import { AppComponent } from './app.component';
import { HeaderComponent } from './fixed-elements/header/header.component';
import { SidebarComponent } from './fixed-elements/sidebar/sidebar.component';
import { FooterComponent } from './fixed-elements/footer/footer.component';
import { ResidentesComponent } from './residentes/residentes.component';
import { ResidentesService } from './residentes/residentes.service';
import { ResidenteComponent } from './residentes/residente/residente.component';
import { InfosPessoaisComponent } from './residentes/residente/infos-pessoais/infos-pessoais.component';
import { SexoPipe } from './shared/pipes/sexo.pipe';
import { EscolaridadePipe } from './shared/pipes/escolaridade.pipe';
import { EstadoCivilPipe } from './shared/pipes/estado-civil.pipe';
import { ReligiaoPipe } from './shared/pipes/religiao.pipe';
import { CpfPipe } from './shared/pipes/cpf.pipe';
import { RgPipe } from './shared/pipes/rg.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    ResidentesComponent,
    ResidenteComponent,
    InfosPessoaisComponent,
    SexoPipe,
    EscolaridadePipe,
    EstadoCivilPipe,
    ReligiaoPipe,
    CpfPipe,
    RgPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    ResidentesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
