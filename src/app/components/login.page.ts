import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../_services/auth.service';

@Component({
  template: `
    <div class="container login bg-dark text-white w-50">
      <h2 class="text-warning title text-center">LOGIN</h2>
      <div class="row justify-content-center my-4 fs-4">
        <div class="col-10">
          <form #form="ngForm" (ngSubmit)="accedi(form)">
            <div class="form-group">
              <label for="username">Username</label>
              <input
                ngModel
                required
                placeholder="inserisci qui la tua username"
                name="username"
                class="form-control"
                type="text"
                id="username"
              />
            </div>
            <div class="form-group">
              <label for="pass">Password</label>
              <input
                ngModel
                required
                placeholder="inserisci qui la tua password"
                name="password"
                class="form-control"
                type="password"
                id="password"
              />
            </div>
            <div class="d-flex align-items-center justify-content-center mt-2">
              <button
                type="submit"
                [disabled]="form.invalid"
                class="btn btn-warning mt-4 fs-5 px-5"
              >
                Accedi
              </button>
              <div class="mt-3">
                <span class="text-white fs-5 mx-3"
                  >oppure
                  <a
                    [routerLink]="['/signup']"
                    routerLinkActive="active"
                    class="reg"
                    >Registrati</a
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
      .login {
        position: relative;
        top: 20vh;
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
      .reg {
        text-decoration: none;
        color: #b18a12;
      }
      .reg:hover {
        color: yellow;
      }
    `,
  ],
})
export class LoginPage implements OnInit {
  isLoading = false;

  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {}

  async accedi(form: NgForm) {
    this.isLoading = true;
    console.log(form.value);
    try {
      await this.authSrv.login(form.value).toPromise();
      this.isLoading = false;
      this.router.navigate(['/']);
    } catch (error) {
      this.isLoading = false;
      form.reset();
      alert(error);
      console.error(error);
    }
  }
}
