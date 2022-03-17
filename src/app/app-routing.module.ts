import { ModificaClientePage } from './components/modifica-cliente.page';
import { CreaClientePage } from './components/crea-cliente.page';
import { DettagliClientePage } from './components/dettagli-cliente.page';
import { DettaglifatturaPage } from './components/dettaglifattura.page';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FatturePage } from './components/fatture.page';
import { HomePage } from './components/home.page';
import { ClientiPage } from './components/clienti.page';
import { LoginPage } from './components/login.page';
import { SignUpPage } from './components/sign-up.page';
import { UsersPage } from './components/users.page';
import { AuthGuard } from './_guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'fatture',
    canActivate: [AuthGuard],
    component: FatturePage,
  },
  {
    path: 'signup',
    component: SignUpPage,
  },
  {
    path: 'clienti',
    canActivate: [AuthGuard],
    component: ClientiPage,
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    component: UsersPage,
  },
  {
    path: 'dettaglifattura/:id',
    canActivate: [AuthGuard],
    component: DettaglifatturaPage,
  },
  {
    path: 'dettaglicliente/:id',
    canActivate: [AuthGuard],
    component: DettagliClientePage,
  },
  {
    path: 'creacliente',
    canActivate: [AuthGuard],
    component: CreaClientePage,
  },
  {
    path: 'modificacliente/:id',
    canActivate: [AuthGuard],
    component: ModificaClientePage
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



