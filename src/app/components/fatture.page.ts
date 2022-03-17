import { Component, OnInit } from '@angular/core';
import { FatturaService } from '../_services/fattura.service';
import { Fattura } from '../_models/Fattura';
import { Router } from '@angular/router';
@Component({
  template: `
    <div class="container">
      <h1 class="text-warning text-center mt-4 mb-3">Lista fatture</h1>
      <div class="row">
        <div class="col mt-2 d-flex justify-content-center">
          <div class="input-group w-50 mb-3">
            <input
              type="text"
              class="form-control fs-5 ps-4 bg-dark text-white rounded-pill"
              placeholder="ricerca per nome cliente"
              aria-describedby="button-search"
              [(ngModel)]="data"
              name="data"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid grid-container mt-3 ">
      <div
        class="card grid-item grow"
        *ngFor="let fattura of fatture | filter: data; let i = index"
      >
        <div class="card-body">
          <h5 class="card-title mb-2 fw-bold">
            {{ fattura.cliente.ragioneSociale }}
          </h5>
          <p class="card-text">
            Importo:<span class="text-primary"> {{ fattura.importo }} €</span>
          </p>
          <p class="card-text">Stato Fattura : {{ fattura.stato.nome }}</p>
          <p class="card-text">ID unico: {{ fattura.id }}</p>
          <p class="card-text">
            Data : {{ fattura.data | date: 'd/M/yy, h:mm a' }}
          </p>
          <hr />
          <a
            [routerLink]="['/dettaglifattura/', fattura.id]"
            routerLinkActive="router-link-active"
            class="btn btn-warning btn-sm"
            >Dettagli Fattura</a
          >
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col mx-auto">
          <nav aria-label="Page navigation" *ngIf="!idCliente">
            <ul class="pagination" *ngIf="response">
              <li class="page-item" *ngIf="!response.first">
                <a
                  class="page-link"
                  (click)="$event.preventDefault(); CambiaPagina(0)"
                  href="#"
                  >Inizio</a
                >
              </li>
              <li class="page-item" *ngIf="!response.first">
                <a
                  class="page-link"
                  (click)="
                    $event.preventDefault(); CambiaPagina(response.number - 1)
                  "
                  href="#"
                  >&laquo;</a
                >
              </li>
              <li class="page-item" *ngIf="!response.last">
                <a
                  class="page-link"
                  (click)="
                    $event.preventDefault(); CambiaPagina(response.number + 1)
                  "
                  href="#"
                  >&raquo;</a
                >
              </li>
              <li class="page-item" *ngIf="!response.last">
                <a
                  class="page-link"
                  (click)="
                    $event.preventDefault(); CambiaPagina(response.totalPages - 1)
                  "
                  href="#"
                  >Fine</a
                >
              </li>
            </ul>
          </nav>

          <nav aria-label="Page navigation" *ngIf="idCliente">
            <ul class="pagination" *ngIf="response">
              <li class="page-item" *ngIf="!response.first">
                <a
                  class="page-link"
                  (click)="
                    $event.preventDefault(); CambiaPagina(response.number - 1)
                  "
                  href="#"
                  >&laquo;</a
                >
              </li>
              <li
                class="page-item"
                *ngFor="let p of counter(response.totalPages); index as i"
                [ngClass]="i == response.number ? 'active' : ''"
              >
                <a
                  class="page-link"
                  (click)="$event.preventDefault(); CambiaPagina(i)"
                  href="#"
                  >{{ i + 1 }}</a
                >
              </li>
              <li class="page-item" *ngIf="!response.last">
                <a
                  class="page-link"
                  (click)="
                    $event.preventDefault(); CambiaPagina(response.number + 1)
                  "
                  href="#"
                  >&raquo;</a
                >
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .grid-container {
        width: 70%;
        display: grid;
        column-gap: 0px;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        padding: 10px;
      }
      .grid-item {
        width: 15vw;
        height: auto;
        margin: 10px 0;
      }

      .grow {
        transition: all 0.3s ease-in-out;
        cursor: pointer;
      }
      .grow:hover {
        transform: scale(1.1);
      }
      a {
        cursor: pointer;
      }
    `,
  ],
})
export class FatturePage implements OnInit {
  constructor(private fatturaSrv: FatturaService, private router: Router) {}
  fatture!: Fattura[];
  page!: number;
  idCliente!: number;
  pageSize!: number;
  response: any;
  cliente: any;
  data: string;

  ngOnInit(): void {
    this.getFatture();
  }

  getFatture() {
    this.fatturaSrv.getAll(0).subscribe((res) => {
      this.response = res;
      this.fatture = this.response.content;
      console.log(res);
    });
  }

  CambiaPagina(p: number) {
    if (this.idCliente) {
      this.fatturaSrv.getFattureByCliente(this.idCliente, p).subscribe((c) => {
        console.log(c);
        this.response = c;
        this.fatture = c.content;
      });
    } else {
      this.fatturaSrv.getAll(p).subscribe((c) => {
        console.log(c);
        this.response = c;
        this.fatture = c.content;
      });
    }
  }
  counter(i: number) {
    return new Array(i);
  }
}
