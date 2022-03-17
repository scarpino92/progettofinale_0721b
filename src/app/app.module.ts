import { MyHttpInterceptor } from './_interceptors/my-http-interceptor';
import { FatturePage } from './components/fatture.page';
import { ClientiPage } from './components/clienti.page';
import { SignUpPage } from './components/sign-up.page';
import { HomePage } from './components/home.page';
import { LoginPage } from './components/login.page';
import { NavbarComponent } from './components/navbar.component'
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { UsersPage } from './components/users.page';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DettaglifatturaPage } from './components/dettaglifattura.page';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DettagliClientePage } from './components/dettagli-cliente.page';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { CreaClientePage } from './components/crea-cliente.page';
import { ModificaClientePage } from './components/modifica-cliente.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePage,
    LoginPage,
    SignUpPage,
    ClientiPage,
    FatturePage,
    UsersPage,
    DettaglifatturaPage,
    DettagliClientePage,
    CreaClientePage,
    ModificaClientePage,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass: MyHttpInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


