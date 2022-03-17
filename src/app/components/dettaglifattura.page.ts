import { StatoFattura } from './../_models/StatoFattura';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Fattura } from '../_models/Fattura';
import { FatturaService } from '../_services/fattura.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  template: `
    <div class="container">
      <div class="row mt-4">
        <div class="col text-white d-flex align-items-center">
          <span
            class="btnBack float-right fs-2"
            [routerLink]="['/fatture']"
            routerLinkActive="router-link-active"
            ><i class="bi bi-arrow-left-circle"></i></span
          ><span class="fs-5 ms-2">Torna alla lista fatture</span>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <h1 class="text-warning text-center my-3">
            Dettagli fattura n. {{ fattura.id }}
          </h1>
        </div>
      </div>
    </div>
    <div class="card bg-dark text-white mx-auto mt-3 p-2" style="width: 30vw">
      <div class="card-body">
        <h5 class="card-title text-warning fw-bold fs-3">
          {{ fattura.cliente.ragioneSociale }}
        </h5>
        <h5 class="card-subtitle mb-2 fs-4 text-muted">
          {{ fattura.cliente.nomeContatto }}
          {{ fattura.cliente.cognomeContatto }}
        </h5>
        <p class="card-text fs-5 mt-3">
          Importo:<span class="text-warning"> {{ fattura.importo }} €</span>
        </p>
        <p class="card-text fs-5">
          Stato Fattura :
          <select
            name="stato"
            id="stato"
            class="px-4 rounded ms-3 text-center"
            (change)="onChange($event)"
          >
            <option value="{{ fattura.stato.id }}" selected>
              {{ fattura.stato.nome }}
            </option>
            <option *ngIf="fattura.stato.id == 1" value="2">PAGATA</option>
            <option *ngIf="fattura.stato.id == 2" value="1">NON PAGATA</option>
          </select>
        </p>
        <p class="card-text fs-5">ID unico: {{ fattura.id }}</p>
        <p class="card-text fs-5 mb-3">
          Data : {{ fattura.data | date: 'd/M/yy, h:mm a' }}
        </p>
        <div class="row">
          <div class="col d-flex justify-content-center">
            <span
              *ngIf="modificato"
              class="btn btn-success mx-4 fs-5 px-3"
              (click)="inviaDati()"
              >Salva</span
            >
            <span class="btn btn-danger fs-5 px-3" (click)="openModal(content)"
              >Elimina</span
            >
          </div>
        </div>
      </div>
    </div>

    <ng-template #content let-modal>
      <div class="modal-header">
        <h4 class="modal-title">
          Fattura: {{ fattura.cliente.ragioneSociale }}
        </h4>
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          (click)="modal.dismiss('Cross click')"
        ></button>
      </div>
      <div class="modal-body">
        <p>
          Importo:<span class="text-success"> {{ fattura.importo }} €</span>
        </p>
        <p>Sei sicuro di voler eliminare definitivamente questa fattura?</p>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-warning"
          (click)="modal.close('Close click')"
        >
          Annulla
        </button>
        <button type="button" class="btn btn-danger" (click)="elimina()">
          Elimina fattura
        </button>
      </div>
    </ng-template>
  `,
  styles: [
    `
      .btnBack {
        cursor: pointer;
      }
    `,
  ],
})
export class DettaglifatturaPage implements OnInit {
  fattura!: Fattura;
  modificato!: boolean;
  nuovoStato!: StatoFattura;
  k!: number;

  constructor(
    private fatturaSrv: FatturaService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  async ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.carica(id);
    });
  }

  async carica(id: number) {
    await this.fatturaSrv.clickdettagli(id).subscribe((res) => {
      this.fattura = res;
      console.log(this.fattura);
    });
  }
  onChange(e: any) {
    this.modificato = true;
    this.k = e.target.value;
    if (this.k == 2) {
      this.nuovoStato = {
        id: 2,
        nome: 'PAGATA',
      };
    } else {
      this.nuovoStato = {
        id: 1,
        nome: 'NON PAGATA',
      };
    }
    this.fattura.stato = this.nuovoStato;
  }

  inviaDati() {
    this.fatturaSrv.change(this.fattura).subscribe((res) => {
      this.modificato = false;
    });
    alert('Fattura modificata con successo!');
  }

  elimina() {
    this.fatturaSrv.onElimina(this.fattura.id).subscribe((res) => {
      this.modalService.dismissAll();
      this.router.navigate(['/fatture']);
    });
  }

  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }
}
