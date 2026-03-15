import { Injectable } from '@angular/core';
import { HttpClientService } from './httpClient.service';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { ILoginResponse } from '../models/interfaces/ILoginResponse';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private clientService: HttpClientService) { }
  LoginIn(model: LoginModel): Observable<ILoginResponse> {
    return this.clientService.post<ILoginResponse>('authentication/signin', model);
  }
}
