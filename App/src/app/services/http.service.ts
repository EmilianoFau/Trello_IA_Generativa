import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {List} from '../models/list';
import {Card} from '../models/card';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  baseUrl: string = 'http://127.0.0.1:8000';

  getLists(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/list', this.httpOptions);
  }

  getCards(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/card/', this.httpOptions);
  }

  postList(title: string, description: string): Observable<any> {
    const requestBody: List = {
      title: title,
      description: description
    };
    return this.http.post<any>(this.baseUrl + '/list', requestBody, this.httpOptions);
  }

  postCard(description: string, idList: string, title: string): Observable<any> {
    const requestBody: Card = {
      description: description,
      idList: idList,
      title: title
    };
    return this.http.post<any>(this.baseUrl + '/card', requestBody, this.httpOptions);
  }

  putList(idList: string, title: string, description: string): Observable<any> {
    const requestBody: List = {
      title: title,
      description: description
    };
    return this.http.put<any>(this.baseUrl + '/list/' + idList, requestBody, this.httpOptions);
  }

  putCard(description: string, idList: string, title: string, idCard: string): Observable<any> {
    const requestBody: Card = {
      description: description,
      idList: idList,
      title: title
    };
    return this.http.post<any>(this.baseUrl + '/card/' + idCard, requestBody, this.httpOptions);
  }

  deleteList(idList: string): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/list/' + idList, this.httpOptions);
  }

  deleteCard(idCard: string): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/card/' + idCard, this.httpOptions);
  }
}
