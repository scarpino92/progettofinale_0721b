import { Injectable } from '@angular/core';
import { Cliente } from '../_models/Cliente';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientiService {
  myApiUrl: string = environment.pathApi;
  pathApi: string;
  p: number;
  constructor(private http: HttpClient) {}

  getAll(p:number) {
    return this.http.get<any>(
      `${this.myApiUrl}/api/clienti?page=${p}&size=20&sort=id,ASC`);
  }

  getbyID(id: number) {
    return this.http.get<any>(`${this.myApiUrl}/api/clienti/${id}`);
  }

  getbyCliente(id: number) {
    return this.http.get<any>(
      `${this.myApiUrl}/api/fatture/cliente/${id}?page=0&size=200&sort=id,ASC`);
  }

  creaFattura(data: any) {
    return this.http.post<any>(`${this.myApiUrl}/api/fatture`, data);
  }
  deleteFatture(id: number) {
    return this.http.delete(`${this.myApiUrl}/api/fatture/cliente/${id}`);
  }

  deleteCliente(id: number) {
    return this.http.delete(`${this.myApiUrl}/api/clienti/${id}`);
  }

  createCliente(cliente: Cliente) {
    return this.http.post(`${this.myApiUrl}/api/clienti`, cliente);
  }

  modifica(data: any) {
    return this.http.put(`${this.myApiUrl}/api/clienti/${data.id}`, data);
  }

  getTipiCliente() {
    return this.http.get(`${this.myApiUrl}/api/clienti/tipicliente`);
  }

  creaNuovoCliente(data: any) {
    return this.http.post(
      `${this.myApiUrl}/api/clienti/tipicliente`,
      data
    );
  }
}
