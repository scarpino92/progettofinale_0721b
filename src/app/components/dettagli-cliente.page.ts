import { ActivatedRoute } from '@angular/router';
import { ClientiService } from '../_services/clienti.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Fattura } from '../_models/Fattura';

@Component({
  selector: 'app-dettagli-cliente',
  template: `
    <div class="container mt-3 border border-white rounded p-5">
      <div class="mb-3 text-white">
        <span
          class="btnBack float-right fs-3"
          [routerLink]="['/clienti']"
          routerLinkActive="active"
          ><i class="bi bi-arrow-left-circle"></i></span
        ><span class="fs-5 ms-2">Torna alla lista clienti</span>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th class="text-warning" colspan="1"><h2>Dati aziendali:</h2></th>
          </tr>
        </thead>
        <tbody class="text-white fs-5">
          <tr>
            <td colaspan="2" class="text-secondary fw-bold">NOME AZIENDA:</td>
            <td>{{ cliente.ragioneSociale }}</td>
          </tr>
          <tr>
            <td colaspan="2" class="text-secondary fw-bold">PARTITA IVA:</td>
            <td>{{ cliente.partitaIva }}</td>
          </tr>
          <tr>
            <td colaspan="2" class="text-secondary fw-bold">
              EMAIL AZIENDALE:
            </td>
            <td>{{ cliente.email }}</td>
          </tr>
          <tr>
            <td colaspan="2" class="text-secondary fw-bold">EMAIL PEC:</td>
            <td>{{ cliente.pec }}</td>
          </tr>
          <tr>
            <td colaspan="2" class="text-secondary fw-bold">TEL AZIENDALE:</td>
            <td>{{ cliente.telefono }}</td>
          </tr>
        </tbody>
      </table>
      <table class="table">
        <thead>
          <tr>
            <th class="text-warning" colspan="1"><h2>Contatto:</h2></th>
          </tr>
        </thead>
        <tbody class="text-white fs-5">
          <tr>
            <td colaspan="2" class="text-secondary fw-bold">NOME:</td>
            <td>{{ cliente.nomeContatto }} {{ cliente.cognomeContatto }}</td>
          </tr>
          <tr>
            <td colaspan="2" class="text-secondary fw-bold">TELEFONO:</td>
            <td>{{ cliente.telefonoContatto }}</td>
          </tr>
          <tr>
            <td colaspan="2" class="text-secondary fw-bold">EMAIL:</td>
            <td>{{ cliente.emailContatto }}</td>
          </tr>
          <tr>
            <td colaspan="2" class="text-secondary fw-bold">SEDE OPERATIVA:</td>
            <td>
              {{ cliente.indirizzoSedeOperativa.localita }}(
              {{ cliente.indirizzoSedeOperativa.comune.provincia.sigla }}
              ), {{ cliente.indirizzoSedeOperativa.via }}
            </td>
          </tr>
          <tr>
            <td colaspan="2" class="text-secondary fw-bold">SEDE LEGALE:</td>
            <td>
              {{ cliente.indirizzoSedeLegale.localita }}(
              {{ cliente.indirizzoSedeLegale.comune.provincia.sigla }}
              ), {{ cliente.indirizzoSedeLegale.via }}
            </td>
          </tr>
        </tbody>
      </table>

      <div class="container mt-5">
        <div class="row text-center mt-4">
          <div class="col-4">
            <button class="btn btn-info" (click)="mostraFatture(cliente.id)">
              Mostra fatture
            </button>
          </div>
          <div class="col-4">
            <button
              class="btn btn-danger"
              [routerLink]="['/clienti']"
              routerLinkActive="active"
            >
              Per eliminare il cliente torna alla lista clienti
            </button>
          </div>
          <div class="col-4">
            <button class="btn btn-warning" (click)="newFattura(content)">
              Nuova fattura
            </button>
          </div>
        </div>
        <hr class="border border-top border-white mt-4" />
        <div class="container mt-4" *ngIf="mostra">
          <div class="row">
            <div class="col-4 mt-3" *ngFor="let fattura of fatture">
              <div class="card grow" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title fs-5">{{ fattura.name }}</h5>
                  <h6 class="card-subtitle mb-2 text-dark fw-bold fs-5">
                    {{ fattura.cliente.ragioneSociale }}
                  </h6>
                  <p class="card-text">
                    Importo:
                    <span class="text-success">{{ fattura.importo }} €</span>
                  </p>
                  <p class="card-text">
                    Stato Fattura : {{ fattura.stato.nome }}
                  </p>
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
          </div>
        </div>
      </div>

      <ng-template #content let-modal>
        <div class="container p-3 bg-dark text-white">
          <div class="modal-header">
            <h4 class="modal-title fw-bold text-warning">Nuova fattura</h4>
            <button
              type="button"
              class="btn-close"
              aria-label="Close"
              (click)="modal.dismiss('Cross click')"
            ></button>
          </div>
          <div class="modal-body">
            <form #form="ngForm">
              <div class="form-group">
                <label for="date">Data</label>
                <input
                  ngModel
                  name="data"
                  class="form-control"
                  type="date"
                  id="data"
                />
              </div>
              <div class="form-group">
                <label for="importo">IMPORTO</label>
                <input
                  ngModel
                  name="importo"
                  class="form-control"
                  type="number"
                  id="importo"
                />
              </div>
              <div class="form-group">
                <label for="numero">Numero fattura</label>
                <input
                  ngModel
                  name="numero"
                  class="form-control"
                  type="number"
                  id="numero"
                />
              </div>
              <div class="form-group">
                <label for="anno">Anno</label>
                <input
                  ngModel
                  name="anno"
                  class="form-control"
                  type="number"
                  id="anno"
                />
              </div>
              <div class="form-group">
                <label for="numero">Stato</label><br />
                <select ngModel name="stato" id="stato">
                  <option value="2">PAGATA</option>
                  <option value="1">NON PAGATA</option>
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer justify-content-center">
            <button
              type="button"
              class="btn btn-danger px-4"
              (click)="modal.close('Close click')"
            >
              Annulla
            </button>
            <button
              type="button"
              class="btn btn-success px-4"
              (click)="onAggiunta(form)"
            >
              Crea
            </button>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  styles: [
    `
      .grow {
        transition: all 0.3s ease-in-out;
        cursor: pointer;
      }
      .grow:hover {
        transform: scale(1.1);
      }
      .btnBack {
        cursor: pointer;
      }
    `,
  ],
})
export class DettagliClientePage implements OnInit {
  mostra: boolean = false;
  cliente!: any;
  fatture!: any;
  nuovaFattura!: Fattura;
  constructor(
    private clientiSrv: ClientiService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.clientiSrv.getbyID(id).subscribe((res) => {
        this.cliente = res;
        console.log(this.cliente);
      });
    });
  }
  mostraFatture(a: number) {
    if (this.mostra == false) {
      this.mostra = true;
      this.clientiSrv.getbyCliente(a).subscribe((res) => {
        this.fatture = res.content;
      });
    } else {
      this.mostra = false;
      return;
    }
  }
  newFattura(content: any) {
    this.modalService.open(content, { centered: true });
  }

  onAggiunta(dati: any) {
    this.nuovaFattura = {
      id: 0,
      numero: 0,
      anno: 0,
      importo: 0,
      data: '',
      stato: { id: 0, nome: '' },
      cliente: {},
    };
    this.nuovaFattura.anno = dati.value.anno;
    this.nuovaFattura.data = dati.value.data;
    this.nuovaFattura.importo = dati.value.importo;
    this.nuovaFattura.numero = dati.value.numero;
    this.nuovaFattura.stato.id = dati.value.stato;
    this.nuovaFattura.cliente.id = this.cliente.id;
    this.clientiSrv.creaFattura(this.nuovaFattura).subscribe((res) => {
      this.modalService.dismissAll();
      alert('Fattura aggiunta con successo!');
      this.mostraFatture(this.cliente.id);
    });
  }
}
