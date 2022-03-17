import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ComuniService {
  pathApi: string;
  constructor(private http: HttpClient) {
    this.pathApi = environment.pathApi;
  }

  getAllComuni(p: number) {
    return this.http.get(
      `${environment.pathApi}/api/comuni?page=${p}&size=20&sort=id,ASC`
    );
  }

  getComuneId(id: number) {
    return this.http.get(`${environment.pathApi}/api/comuni/${id}`);
  }
}
