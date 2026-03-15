import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private http: HttpClient

  ) { }

  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${environment.API_Url}/${endpoint}`);
  }
  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${environment.API_Url}/${endpoint}`, data);
  }
  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${environment.API_Url}/${endpoint}`, data);
  }
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${environment.API_Url}/${endpoint}`);
  }

}
