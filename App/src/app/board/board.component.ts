import {Component} from '@angular/core';
import {HttpService} from '../services/http.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {List} from '../models/list';
import {Card} from '../models/card';
import {CreateCardFormComponent} from '../create-card-form/create-card-form.component';
import {NgForOf, NgIf} from '@angular/common';
import {CardComponent} from '../card/card.component';
import {CreateListFormComponent} from '../create-list-form/create-list-form.component';
import {ListComponent} from '../list/list.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CreateCardFormComponent,
    NgIf,
    CardComponent,
    NgForOf,
    CreateListFormComponent,
    ListComponent
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {
  lists: List[] = [];

  isCreateCardFormOpen: boolean = false;
  selectedList: List | undefined;
  isCardOpen: boolean = false;
  selectedCard: Card | undefined;
  isCreateListFormOpen: boolean = false;
  isListOpen: boolean = false;

  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.getLists();
  }

  openCreateCardForm(list: List): void {
    this.selectedList = list;
    this.isCreateCardFormOpen = true;
  }

  closeCreateCardForm(): void {
    this.selectedList = undefined;
    this.isCreateCardFormOpen = false;
  }

  openCard(card: Card): void {
    this.selectedCard = card;
    this.isCardOpen = true;
  }

  closeCard(): void {
    this.selectedCard = undefined;
    this.isCardOpen = false;
  }

  openCreateListForm(): void {
    this.isCreateListFormOpen = true;
  }

  closeCreateListForm(): void {
    this.isCreateListFormOpen = false;
  }

  openList(list: List): void {
    this.selectedList = list;
    this.isListOpen = true;
  }

  closeList(): void {
    this.selectedList = undefined;
    this.isListOpen = false;
  }

  getLists(): void {
    this.http.getLists().subscribe(
      (lists: List[]): void => {
        this.lists = lists;
        this.getCards();
      }, (err: HttpErrorResponse): void => {
        console.log(err);
      }
    )
  }

  getCards(): void {
    this.http.getCards().subscribe(
      (cards: Card[]): void => {
        this.lists.forEach((list: List): void => {
          list.cards = cards.filter((card: Card): boolean => card.idList === list.idList);
        });
        console.log(this.lists)
      }, (err: HttpErrorResponse): void => {
        console.log(err);
      }
    )
  }

  deleteList(idList: string | undefined): void {
    if (idList) {
      this.http.deleteList(idList).subscribe(
        (response: HttpResponse<BoardComponent[]>) => {
          this.getLists();
        }, (err: HttpErrorResponse) => {
          console.log(err);
        }
      )
    }
  }
}
