import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ClientiService } from '../_services/clienti.service';
import { Cliente } from '../_models/Cliente';
import { Router } from '@angular/router';

@Component({
  template: `
    <div class="container">
      <h1 class="text-warning text-center mt-4 mb-3">Lista clienti</h1>
      <div class="row mt-4 mb-5 d-flex align-items-center justify-content-end">
        <div class="col-4">
          <button
            id="addC"
            class="btn btn-warning"
            [routerLink]="['/creacliente']"
            routerLinkActive="router-link-active"
          >
            Aggiungi Cliente <i class="bi bi-person-plus-fill"></i>
          </button>
        </div>
        <div class="col-8">
          <div class="input-group w-100">
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
    <div class="container">
      <table class="table">
        <thead>
          <tr class="text-warning">
            <th scope="col">ID cliente</th>
            <th scope="col">Ragione Sociale</th>
            <th scope="col">Partita IVA</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody *ngFor="let cliente of clienti | filter: data; let i = index">
          <tr class="text-white">
            <th scope="row">{{ cliente.id }}</th>
            <td>{{ cliente.ragioneSociale }}</td>
            <td>{{ cliente.partitaIva }}</td>
            <td>{{ cliente.email }}</td>
            <td>
              <button
                class="btn btn-outline-success text-white my-1"
                [routerLink]="['/dettaglicliente/', cliente.id]"
                routerLinkActive="active"
              >
                Dettagli cliente
              </button>
            </td>
            <td>
              <button
                class="btn btn-outline-warning my-1"
                [routerLink]="['/modificacliente', cliente.id]"
                routerLinkActive="active"
              >
                Modifica
              </button>
            </td>
            <td>
              <button class="btn btn-danger my-1" (click)="open(mymodal)">
                Elimina
              </button>
              <ng-template #mymodal let-modal>
                <div class="modal-header">
                  <h4 class="modal-title" id="modal-basic-title">
                    Sei sicuro?
                  </h4>
                  <button
                    type="button"
                    class="close"
                    aria-label="Close"
                    (click)="modal.dismiss('Cross click')"
                  >
                    <span aria-hidden="true">✖</span>
                  </button>
                </div>
                <div class="modal-body">
                  Stai per eliminare il cliente
                  <strong>{{ cliente.ragioneSociale }}</strong> e tutte le sue
                  fatture. Sei sicuro di voler procedere?
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    (click)="modal.close('Save click')"
                  >
                    Indietro
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    (click)="eliminaCliente(cliente.id, i); modal.close()"
                  >
                    Si, sono sicuro
                  </button>
                </div>
              </ng-template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="container">
      <div class="row">
        <div class="col mx-auto">
          <nav aria-label="Page navigation">
            <ul class="pagination">
              <li class="page-item" *ngIf="!response.first">
                <a class="page-link" (click)="cambiaPag(response.number - 1)"
                  >&laquo;</a
                >
              </li>
              <li
                class="page-item"
                *ngFor="let pag of numP; let p = index"
                [ngClass]="p == response.number ? 'active' : ''"
              >
                <a class="page-link" (click)="cambiaPag(p)">{{ p + 1 }}</a>
              </li>
              <li class="page-item" *ngIf="!response.last">
                <a class="page-link" (click)="cambiaPag(response.number + 1)"
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
      a {
        cursor: pointer;
      }
    `,
  ],
})
export class ClientiPage implements OnInit {
  constructor(
    private clientiSrv: ClientiService,
    private router: Router,
    private modal: NgbModal
  ) {}

  response: any;
  closeResult = '';
  idCliente: number;
  pagCorr: number = 0;
  numP: any;
  clienti!: Cliente[];
  data: string;

  ngOnInit(): void {
    this.getClienti();
  }

  getClienti(): void {
    this.clientiSrv.getAll(0).subscribe(
      (c) => {
        this.response = c;
        this.clienti = this.response.content;
        const numP = Array(this.response.totalPages);
        this.numP = numP;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cambiaPag(page: number) {
    this.clientiSrv.getAll(page).subscribe((c) => {
      console.log(page);
      this.response = c;
      this.clienti = this.response.content;
      this.pagCorr = page;
    });
  }

  open(content) {
    this.modal
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  async eliminaCliente(idCliente: number, i: number) {
    this.idCliente = idCliente;
    let id = this.pagCorr * 20 + this.idCliente;
    console.log(id);
    await this.clientiSrv.deleteFatture(idCliente).toPromise();
    this.clientiSrv.deleteCliente(idCliente).subscribe((c) => {
      console.log(c);
      this.router.navigate(['/clienti']);
      this.clienti.splice(i, 1);
    });
  }
}
