import {Component} from '@angular/core';
import {HttpService} from '../services/http.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {List} from '../models/list';
import {Priority} from '../models/priority';
import {Status} from '../models/status';
import {Card} from '../models/card';
import {PostCardFormComponent} from '../post-card-form/post-card-form.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    PostCardFormComponent
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {
  constructor(private http: HttpService) {}

  lists: List[] = [];
  card: Card[] = [];
  selectedCard: Card | null = null;
  isEdit: boolean = false;

  ngOnInit(): void {
    this.getLists();
  }

  openCardModal(card: Card | null): void {
    this.selectedCard = card;
    this.isEdit = card !== null;
  }

  closeCardModal(): void {
    this.selectedCard = null;
    this.isEdit = false;
  }

  getLists(): void {
    this.http.getLists().subscribe(
      (response: HttpResponse<BoardComponent[]>) => {

      }, (err: HttpErrorResponse) => {

      }
    )
  }

  postList(): void {
    this.http.postList("", "").subscribe(
      (response: HttpResponse<BoardComponent[]>) => {

      }, (err: HttpErrorResponse) => {

      }
    )
  }

  putList(): void {
    this.http.putList("", "", "").subscribe(
      (response: HttpResponse<BoardComponent[]>) => {

      }, (err: HttpErrorResponse) => {

      }
    )
  }

  deleteList(): void {
    this.http.deleteList("").subscribe(
      (response: HttpResponse<BoardComponent[]>) => {

      }, (err: HttpErrorResponse) => {

      }
    )
  }

  getCards(): void {
    this.http.getCards("").subscribe(
      (response: HttpResponse<BoardComponent[]>) => {

      }, (err: HttpErrorResponse) => {

      }
    )
  }

  postCard(): void {
    this.http.postCard("", new Date(), "", Priority.High, new Date(), Status.Backlog, "").subscribe(
      (response: HttpResponse<BoardComponent[]>) => {

      }, (err: HttpErrorResponse) => {

      }
    )
  }

  putCard(): void {
    this.http.putCard("", new Date(), "", Priority.High, new Date(), Status.Backlog, "", "").subscribe(
      (response: HttpResponse<BoardComponent[]>) => {

      }, (err: HttpErrorResponse) => {

      }
    )
  }

  deleteCard(): void {
    this.http.deleteCard("").subscribe(
      (response: HttpResponse<BoardComponent[]>) => {

      }, (err: HttpErrorResponse) => {

      }
    )
  }
}
