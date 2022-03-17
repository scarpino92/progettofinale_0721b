import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ProvinceService {
  pathApi: string;
  constructor(private http: HttpClient) {
    this.pathApi = environment.pathApi;
  }

  getAllProvince(p: number) {
    return this.http.get(
      `${environment.pathApi}/api/province?page=${p}&size=20&sort=id,ASC`
    );
  }

  getProvinciaId(id: number) {
    return this.http.get(`${environment.pathApi}/api/province/${id}`);
  }
}
