import { User } from './../_models/user';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';


@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand text-warning ms-4 me-5">Gestione Fatture</a>
        <div class="collapse navbar-collapse" id="navbar">
          <div class="navbar-nav">
            <li class="nav-item">
              <a
                id="hp"
                class="nav-link"
                [routerLink]="['/']"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                >Home</a
              >
            </li>
            <li *ngIf="!user" class="nav-item">
              <a
                class="nav-link"
                [routerLink]="['/login']"
                routerLinkActive="active"
                >Login</a
              >
            </li>
            <li *ngIf="!user" class="nav-item">
              <a
                class="nav-link"
                [routerLink]="['/signup']"
                routerLinkActive="active"
                >Sign Up</a
              >
            </li>
            <li *ngIf="user" class="nav-item">
              <a
                class="nav-link"
                [routerLink]="['/fatture']"
                routerLinkActive="active"
                >Fatture</a
              >
            </li>
            <li *ngIf="user" class="nav-item">
              <a
                class="nav-link"
                [routerLink]="['/clienti']"
                routerLinkActive="active"
                >Clienti</a
              >
            </li>
            <li *ngIf="user" class="nav-item">
              <a
                class="nav-link"
                [routerLink]="['/users']"
                routerLinkActive="active"
                >Users</a
              >
            </li>
          </div>
        </div>
        <div *ngIf="user" class="d-flex">
          <span class="nav-link text-white ms-5">
            Benvenuto,
            <span class="text-warning">{{ user.username }}</span>
          </span>
          <button (click)="logout()" class="btn btn-danger px-4 me-2">Logout</button>
        </div>
      </div>
    </nav>
  `,
  styles: [
    `
      #hp {
        cursor: pointer;
      }
      li {
        margin: 0px 3px;
        padding: 2px;
      }
      .active,
      li a:focus,
      li a:hover {
        border-radius: 5px;
        border: 1px solid yellow;
        padding: 7px;
      }
    `,
  ],
})
export class NavbarComponent implements OnInit {
  user!: User | null;
  constructor(private authSrv: AuthService) {}

  ngOnInit(): void {
    this.authSrv.user$.subscribe((user) => {
      localStorage.getItem('user');
      this.user = user;
    });
  }

  logout() {
    this.authSrv.logout();
  }
}
