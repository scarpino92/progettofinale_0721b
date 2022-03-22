import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  tenantID = 'fe_0721b';
  bearerToken =
    'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY0Nzk0NjM5OSwiZXhwIjoxNjQ4ODEwMzk5fQ.PwtuOumJ-UHSYZbfWQSeW6WPwZX-VNLvkQjFGEkkGDUWTKQdlq50tGaWIi4uTYG4f7ZpMURC3OKf78yIHutkpA';

  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let myReq: HttpRequest<any> = request;
    myReq = request.clone({
      headers: request.headers
        .set('Authorization', this.bearerToken)
        .set('X-TENANT-ID', this.tenantID),
    });

    return next.handle(myReq);
  }
}
