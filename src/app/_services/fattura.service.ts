import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FatturaService {
  myApiUrl: string = environment.pathApi;
  p: number;

  constructor(private http: HttpClient, private router: Router) {}

  getAll(p:number) {
    return this.http.get<any>(
      `${this.myApiUrl}/api/fatture?page=${p}&size=20&sort=id,ASC`
    );
  }

  getFattureByCliente(id: number, p: number) {
    return this.http.get<any>(
      `${this.myApiUrl}/api/fatture/cliente/${id}?page=${p}&size=20&sort=id,ASC`
    );
  }

  clickdettagli(k: number) {
    return this.http.get<any>(`${this.myApiUrl}/api/fatture/${k}`);
  }

  change(data: any) {
    return this.http.put<any>(`${this.myApiUrl}/api/fatture/${data.id}`, data);
  }

  onElimina(data: any) {
    return this.http.delete<any>(`${this.myApiUrl}/api/fatture/${data}`);
  }
}
