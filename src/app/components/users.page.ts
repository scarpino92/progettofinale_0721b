import { AuthService } from './../_services/auth.service';
import { User } from './../_models/user';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  template: `
    <div class="container">
      <h1 class="text-warning text-center my-4">Lista utenti registrati</h1>
      <div class="row">
        <div class="col">
          <table class="table">
            <thead class="fs-5 text-warning">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Ruoli</th>
              </tr>
            </thead>
            <tbody *ngFor="let u of users; let i = index">
              <tr class="text-white">
                <td>{{ u.id }}</td>
                <td>{{ u.username }}</td>
                <td>{{ u.email }}</td>
                <td>
                  <span class="btn text-info" *ngFor="let ruolo of u.roles">{{
                    ruolo.roleName
                  }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col mx-auto">
          <nav aria-label="Page navigation">
            <ul class="pagination">
              <li class="page-item" *ngIf="!response.first">
                <a
                  class="page-link"
                  (click)="cambiaPag(response.number - 1)"
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
export class UsersPage implements OnInit {
  constructor(private userSrv: UserService, private authSrv: AuthService) {}

  users!: Array<User>;
  response!: any;
  pagCorr: any;
  numP: any;

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.authSrv.getAll(0).subscribe(
      (c) => {
        this.response = c;
        console.log(this.response);
        this.users = this.response.content;
        const numP = Array(this.response.totalPages);
        this.numP = numP;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cambiaPag(page: number) {
    this.authSrv.getAll(page).subscribe((c) => {
      console.log(page);
      this.response = c;
      this.users = this.response.content;
      this.pagCorr = page;
    });
  }
}
