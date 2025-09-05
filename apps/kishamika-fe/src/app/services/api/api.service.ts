import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  apiUrl = environment.apiUrl;

  get<T>(
    url: string,
    params?: HttpParams,
    headers?: HttpHeaders,
  ): Observable<T> {
    return this.http.get<T>(this.apiUrl + url, {
      params,
      withCredentials: true,
      headers,
    });
  }

  post<T, B = unknown>(
    url: string,
    body: B,
    headers?: HttpHeaders,
  ): Observable<T> {
    return this.http.post<T>(this.apiUrl + url, body, {
      withCredentials: true,
      headers,
    });
  }
}
