import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  template: `
    <div class="container register w-50 bg-dark text-white">
      <h2 class="text-warning title text-center">REGISTRATI</h2>
      <div class="row justify-content-center fs-4 my-4">
        <div class="col-10">
          <form #form="ngForm" (ngSubmit)="onsignup(form.value)">
            <div class="form-group">
              <label for="nome">Nome</label>
              <input
                placeholder="inserisci il tuo nome"
                [(ngModel)]="form.value.nome"
                required
                name="nome"
                class="form-control"
                type="nome"
                id="nome"
              />
            </div>
            <div class="form-group">
              <label for="cognome">Cognome</label>
              <input
                placeholder="inserisci il tuo cognome"
                [(ngModel)]="form.value.cognome"
                required
                name="cognome"
                class="form-control"
                type="cognome"
                id="cognome"
              />
            </div>
            <div class="form-group">
              <label for="username">Username</label>
              <input
                placeholder="inserisci qui la tua username"
                [(ngModel)]="form.value.username"
                required
                name="username"
                class="form-control"
                type="username"
                id="username"
              />
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input
                placeholder="esempio@email.com"
                [(ngModel)]="form.value.email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$"
                required
                name="email"
                class="form-control"
                type="email"
                id="email"
              />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                placeholder="inserisci una password con almeno 6 caratteri"
                [(ngModel)]="form.value.password"
                required
                pattern=".{6,}"
                name="password"
                class="form-control"
                type="password"
                id="password"
              />
            </div>
            <div class="form-group w-100 fs-4">
              <h4 class="mt-2">Seleziona il tuo ruolo:</h4>
              <select
                [(ngModel)]="form.value.role"
                required
                name="ruolo"
                class="form-select mb-3 p-2"
              >
                <option selected>...</option>
                <option value="ROLE_USER">Utente</option>
                <option value="ROLE_ADMIN">Amministratore</option>
              </select>
            </div>
            <div class="d-flex align-items-center justify-content-center mt-2">
              <button
                class="btn btn-warning m-2 fs-5 px-5"
                [disabled]="form.invalid"
                type="submit"
              >
                Registrati
                <span
                  *ngIf="isLoading"
                  class="spinner-border spinner-border-sm"
                  role="status"
                ></span>
              </button>
              <div class="text-white">
                <span class="fs-5 mx-3"
                  >oppure
                  <a
                    [routerLink]="['/login']"
                    routerLinkActive="active"
                    class="log"
                    >Fai il login</a
                  ></span
                >
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .register {
        position: relative;
        top: 6vh;
        padding: 40px;
        border-radius: 10px;
      }
      .title {
        font-size: 2.8rem;
      }
      input {
        font-size: 20px;
        padding: 2px;
        margin-bottom: 5px;
      }
      .log {
        text-decoration: none;
        color: #b18a12;
      }
      .log:hover {
        color: yellow;
      }
    `,
  ],
})
export class SignUpPage implements OnInit {
  isLoading = false;
  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {}

  async onsignup(form: NgForm) {
    this.isLoading = true;
    console.log(form.value);
    try {
      await this.authSrv.signup(form.value).toPromise();
      this.router.navigate(['/login']);
      this.isLoading = false;
    } catch (error) {
      console.error(error);
      alert(error);
      form.reset();
      this.isLoading = false;
    }
  }
}
