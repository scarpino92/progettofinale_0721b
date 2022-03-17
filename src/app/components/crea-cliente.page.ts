import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ClientiService } from '../_services/clienti.service';
import { ComuniService } from '../_services/comuni.service';
import { ProvinceService } from '../_services/province.service';
import { Cliente } from '../_models/Cliente';
import { Comune } from '../_models/Comune';
import { Provincia } from '../_models/Provincia';

@Component({
  selector: 'app-crea-cliente',
  template: `
    <form class="mt-3 container text-white fs-5" #form="ngForm">
      <div class="mb-3">
        <span
          class="btnBack float-right fs-3"
          [routerLink]="['/clienti']"
          routerLinkActive="router-link-active"
          ><i class="bi bi-arrow-left-circle"></i></span
        ><span class="fs-5 ms-2">Torna alla lista clienti</span>
      </div>
      <h1 class="text-warning">Nuovo Cliente</h1>
      <hr />
      <h2 class="text-warning">Informazioni personali</h2>
      <hr />
      <div class="form-row">
        <div class="form-group col">
          <label>Nome</label>
          <input
            type="text"
            [(ngModel)]="newCliente.nomeContatto"
            name="nomeContatto"
            class="form-control"
          />
        </div>
        <div class="form-group col">
          <label>Cognome</label>
          <input
            type="text"
            [(ngModel)]="newCliente.cognomeContatto"
            name="cognomeContatto"
            class="form-control"
          />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col">
          <label>Ragione Sociale</label>
          <input
            type="text"
            [(ngModel)]="newCliente.ragioneSociale"
            name="ragioneSociale"
            class="form-control"
          />
        </div>
        <div class="form-group col">
          <label>Partita IVA</label>
          <input
            type="number"
            [(ngModel)]="newCliente.partitaIva"
            name="partitaIva"
            class="form-control"
          />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col">
          <label>Email</label>
          <input
            type="email"
            [(ngModel)]="newCliente.email"
            name="email"
            class="form-control"
          />
        </div>
        <div class="form-group col">
          <label>PEC</label>
          <input
            type="email"
            [(ngModel)]="newCliente.pec"
            name="pec"
            class="form-control"
          />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col">
          <label>Telefono Contatto</label>
          <input
            type="text"
            class="form-control"
            [(ngModel)]="newCliente.telefonoContatto"
            name="telefonoContatto"
            id="telefonoContattoInput"
          />
        </div>
        <div class="form-group col">
          <label>Email Contatto</label>
          <input
            type="email"
            class="form-control"
            [(ngModel)]="newCliente.emailContatto"
            name="emailContatto"
            id="emailContattoInput"
          />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col">
          <label>Telefono</label>
          <input
            type="phone"
            [(ngModel)]="newCliente.telefono"
            name="telefono"
            class="form-control"
          />
        </div>
        <div class="form-group col">
          <label>Tipo Cliente</label>
          <select
            class="form-control"
            [(ngModel)]="newCliente.tipoCliente"
            name="ragioneSociale"
          >
            <option selected>...</option>
            <option>SRL</option>
            <option>SPA</option>
            <option>SAS</option>
            <option>PA</option>
          </select>
        </div>
      </div>
    </form>

    <div class="form-row justify-content-around container text-white mt-3 fs-5">
      <h2 class="text-warning">Sede operativa</h2>
      <hr />
      <div class="col">
        <form class="mt-3 ">
          <div class="form-row">
            <div class="form-group">
              <label>Indirizzo</label>
              <input
                type="text"
                [(ngModel)]="newCliente.indirizzoSedeOperativa.via"
                name="via"
                class="form-control"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Civico</label>
              <input
                type="text"
                [(ngModel)]="newCliente.indirizzoSedeOperativa.civico"
                name="civico"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label>Cap</label>
              <input
                type="number"
                [(ngModel)]="newCliente.indirizzoSedeOperativa.cap"
                name="cap"
                class="form-control"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Località</label>
              <input
                type="text"
                [(ngModel)]="newCliente.indirizzoSedeOperativa.localita"
                name="localita"
                class="form-control"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Provincia</label>
              <select
                class="form-select"
                [(ngModel)]="newCliente.indirizzoSedeOperativa.comune.provincia"
                name="nome"
                class="form-control"
              >
                <option selected>Seleziona Provincia</option>
                <option *ngFor="let p of province" [ngValue]="p">
                  {{ p.nome }}
                </option>
              </select>
            </div>
          </div>
          <div class="form-row text-white fs-5">
            <div class="form-group">
              <label>Comune</label>
              <select
                class="form-select"
                [(ngModel)]="newCliente.indirizzoSedeOperativa.comune"
                name="nome"
                class="form-control"
              >
                <option selected>Seleziona Comune</option>
                <option *ngFor="let c of comuni" [ngValue]="c">
                  {{ c.nome }}
                </option>
              </select>
            </div>
          </div>
        </form>
      </div>

      <div class="col">
        <form class="mt-3">
          <h2 class="text-warning">Sede legale</h2>
          <hr />
          <div class="form-row">
            <div class="form-group">
              <label>Indirizzo</label>
              <input
                type="text"
                [(ngModel)]="newCliente.indirizzoSedeLegale.via"
                name="via"
                class="form-control"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Civico</label>
              <input
                type="text"
                [(ngModel)]="newCliente.indirizzoSedeLegale.civico"
                name="civico"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label>Cap</label>
              <input
                type="number"
                [(ngModel)]="newCliente.indirizzoSedeLegale.cap"
                name="cap"
                class="form-control"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Località</label>
              <input
                type="text"
                [(ngModel)]="newCliente.indirizzoSedeLegale.localita"
                name="localita"
                class="form-control"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Provincia</label>
              <select
                class="form-select"
                [(ngModel)]="newCliente.indirizzoSedeLegale.comune.provincia"
                name="nome"
                class="form-control"
              >
                <option selected>Seleziona Provincia</option>
                <option *ngFor="let p of province" [ngValue]="p">
                  {{ p.nome }}
                </option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Comune</label>
              <select
                class="form-select"
                [(ngModel)]="newCliente.indirizzoSedeLegale.comune"
                name="nome"
                class="form-control"
              >
                <option selected>Seleziona Comune</option>
                <option *ngFor="let c of comuni" [ngValue]="c">
                  {{ c.nome }}
                </option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            class="btn btnAddUser col my-4 px-5 btn-success"
            (click)="addCliente(newCliente)"
          >
            Aggiungi
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [
    `
      .btnBack {
        cursor: pointer;
      }
    `,
  ],
})
export class CreaClientePage implements OnInit {
  constructor(
  private clientiSrv: ClientiService,
    private comuniSrv: ComuniService,
    private provinceSrv: ProvinceService,
    private router: Router,
  ) {}

  tipiClienti: any;
  comuni: Comune[];
  province: Provincia[];
  response: any;
  idProvincia: any;
  provincia1: string;
  provincia2: string;
  filterComuni: Comune[] = [];

  newCliente: Cliente = new Cliente();

  ngOnInit(): void {
    this.clientiSrv.getTipiCliente().subscribe((c) => {
      this.tipiClienti = c;
    });
    this.provinceSrv.getAllProvince(0).subscribe((c) => {
      console.log(c);
      this.response = c;
      this.province = this.response.content;
    });
    this.comuniSrv.getAllComuni(0).subscribe((c) => {
      console.log('c', c);
      this.response = c;
      this.comuni = this.response.content;
    });
  }
  cambioCitta1(event: any) {
    this.idProvincia = event.target.value;
    console.log(this.idProvincia);
    let filterComuni: Array<any> = [];
    this.comuni.filter((comune) => {
      if (this.idProvincia == comune.provincia.id) {
        filterComuni.push(comune);
      }
    });
    console.log(filterComuni);
    this.filterComuni = filterComuni;
  }

  addCliente(newCliente: Cliente) {
    console.log(newCliente);
    this.clientiSrv.createCliente(newCliente).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/clienti']);
    });
  }
}
