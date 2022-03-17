import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  myApiUrl: string = environment.pathApi;
  private authSubj = new BehaviorSubject<null | User>(null);
  user$ = this.authSubj.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.restore();
  }

  login(data: { username: string; password: string }) {
    return this.http.post<User>(`${this.myApiUrl}/api/auth/login`, data).pipe(
      tap((data) => {
        console.log(data);
        this.authSubj.next(data);
        localStorage.setItem('user', JSON.stringify(data));
      }),
      catchError(this.trovaErr)
    );
  }
  signup(data: User) {
    return this.http
      .post<User>(`${this.myApiUrl}/api/auth/signup`, data)
      .pipe(catchError(this.trovaErr));
  }

  logout() {
    this.authSubj.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  restore() {
    const user = localStorage.getItem('user');
    if (!user) {
      return;
    }
    const userdata: User = JSON.parse(user);
    this.authSubj.next(userdata);
  }

  getAll(p: number) {
    return this.http.get<any>(
      `${this.myApiUrl}/api/users?page=${p}&size=20&sort=id,ASC`
    );
  }

  private trovaErr(err: any) {
    switch (err.error) {
      case 'Email and password are required':
        return throwError('ERRORE: Email e password sono obbligatorie!');
        break;
      case 'Email already exists':
        return throwError('ERRORE: Utente già registrato!');
        break;
      case 'Email format is invalid':
        return throwError("ERRORE: Formato dell'email non valido!");
        break;
      case 'Cannot find user':
        return throwError("ERRORE: L'utente non esiste!");
        break;
      default:
        return throwError('ERRORE! Compilare correttamente i campi');
        break;
    }
  }
}
