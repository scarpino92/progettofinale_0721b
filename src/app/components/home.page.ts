import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user';

@Component({
  template: `
    <div *ngIf="!user" class="container">
      <div class="row">
        <div class="col text-center text-warning">
          <h1 class="fw-bold my-5 display-5">
            Il nuovo software per la gestione delle fatture
          </h1>
          <img
            src="../../assets/images/fatturazione-elettronica.jpg"
            class="rounded"
            alt="fatturazione elettronica"
          />
        </div>
      </div>
      <div class="row mt-5 px-4 fs-5">
        <div class="col">
          <p class="text-white text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
            neque, ullam laborum provident vero debitis nobis voluptas
            exercitationem enim, labore accusantium iure, tenetur voluptatibus
            a? Laborum alias aspernatur reprehenderit sed.
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col d-flex justify-content-center mt-3">
          <button
            class="btn btn-primary fs-5 me-5 px-5"
            [routerLink]="['/signup']"
            routerLinkActive="active"
          >
            Registrati <i class="bi bi-pencil-square"></i>
          </button>
          <button
            class="btn btn-success fs-5 px-5"
            [routerLink]="['/login']"
            routerLinkActive="active"
          >
            Accedi <i class="bi bi-key"></i>
          </button>
        </div>
      </div>
      <div class="row my-4 mb-5 row-cols-1 row-cols-md-3 g-4 text-center">
        <div class="col">
          <div class="card bg-dark text-white h-100">
            <div class="card-body">
              <h5 class="card-title text-warning">Inserimento fatture</h5>
              <p class="card-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae,
                totam odio. Veritatis adipisci nostrum autem blanditiis fugiat.
              </p>
            </div>
          </div>
        </div>
        <div>
          <div class="card bg-dark text-white h-100">
            <div class="card-body">
              <h5 class="card-title text-warning">Gestione clienti</h5>
              <p class="card-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae,
                totam odio. Veritatis adipisci nostrum autem blanditiis fugiat.
              </p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card bg-dark text-white h-100">
            <div class="card-body">
              <h5 class="card-title text-warning">Fatturazione differita</h5>
              <p class="card-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae,
                totam odio. Veritatis adipisci nostrum autem blanditiis fugiat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container mt-5" *ngIf="user">
      <div class="row row-cols-2">
        <div class="col">
          <div
            class="wrapper grow mt-4 fadeIn"
            [routerLink]="['/clienti']"
            routerLinkActive="router-link-active"
          >
            <div id="content">
              <div class="fadeIn p-2 pt-4">
                <h2><i class="text-warning bi bi-people-fill"></i></h2>
              </div>
              <div id="footer">
                <h4>Gestione Clienti</h4>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div
            class="wrapper grow mt-4 fadeIn"
            [routerLink]="['/fatture']"
            routerLinkActive="router-link-active"
          >
            <div id="content">
              <div class="fadeIn p-2 pt-4">
                <h2><i class="text-warning bi bi-file-text-fill"></i></h2>
              </div>
              <form></form>
              <div id="footer">
                <h4>Gestione Fatture</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div
          class="wrapper grow mt-4 fadeIn"
          [routerLink]="['/users']"
          routerLinkActive="router-link-active"
        >
          <div id="content">
            <div class="fadeIn p-2 pt-4">
              <h2><i class="text-warning bi bi-person-lines-fill"></i></h2>
            </div>
            <form></form>
            <div id="footer">
              <h4>Utenti registrati</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .wrapper {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        min-height: 100%;
        padding: 20px;
      }
      .grow {
        transition: all 0.3s ease-in-out;
        cursor: pointer;
      }
      .grow:hover {
        transform: scale(1.1);
      }
      #content {
        border-radius: 10px;
        background: rgb(80, 80, 80);
        padding: 30px;
        width: 90%;
        max-width: 450px;
        max-height: 250px;
        position: relative;
        padding: 0px;
        box-shadow: 0 30px 60px 0 rgb(0, 0, 0);
        text-align: center;
      }

      #footer {
        background-color: #212529;
        border-top: 1px solid #dce8f1;
        color: white;
        padding: 15px;
        text-align: center;
        border-radius: 0 0 10px 10px;
      }
      h2 {
        font-size: 5em;
        color: #14ffec;
      }
      h2.inactive {
        color: #cccccc;
      }
      h2.active {
        color: #0d0d0d;
        border-bottom: 2px solid #6873f0;
      }
      .fadeIn {
        opacity: 0;
        animation: fadeIn ease-in 1;
        animation-fill-mode: forwards;
        animation-duration: 1s;
      }
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    `,
  ],
})
export class HomePage implements OnInit {
  user!: User | null;
  constructor(private authSrv: AuthService) {}

  ngOnInit(): void {
    this.authSrv.user$.subscribe((user) => {
      this.user = user;
    });
  }

  logout() {
    this.authSrv.logout();
  }
}
