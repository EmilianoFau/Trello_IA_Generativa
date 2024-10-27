import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {List} from '../models/list';
import {Card} from '../models/card';
import {Priority} from '../models/priority';
import {Status} from '../models/status';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  baseUrl: string = 'https://localhost:44397';

  getLists(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/list', this.httpOptions);
  }

  postList(title: string, description: string): Observable<any> {
    const requestBody: List = {
      title: title,
      description: description
    };
    return this.http.post<any>(this.baseUrl + '/list', requestBody, this.httpOptions);
  }

  putList(idList: string, title: string, description: string): Observable<any> {
    const requestBody: List = {
      title: title,
      description: description
    };
    return this.http.put<any>(this.baseUrl + '/list/' + idList, requestBody, this.httpOptions);
  }

  deleteList(idList: string): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/list/' + idList, this.httpOptions);
  }

  getCards(idList: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/card/' + idList, this.httpOptions);
  }

  postCard(description: string, endDate: Date, idList: string, priority: Priority, startDate: Date, status: Status, title: string): Observable<any> {
    const requestBody: Card = {
      description: description,
      endDate: endDate,
      idList: idList,
      priority: priority,
      startDate: startDate,
      status: status,
      title: title
    };
    return this.http.post<any>(this.baseUrl + '/card', requestBody, this.httpOptions);
  }

  putCard(description: string, endDate: Date, idList: string, priority: Priority, startDate: Date, status: Status, title: string, idCard: string): Observable<any> {
    const requestBody: Card = {
      description: description,
      endDate: endDate,
      idList: idList,
      priority: priority,
      startDate: startDate,
      status: status,
      title: title
    };
    return this.http.post<any>(this.baseUrl + '/card/' + idCard, requestBody, this.httpOptions);
  }

  deleteCard(idCard: string): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/card/' + idCard, this.httpOptions);
  }
}
