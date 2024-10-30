import {Component} from '@angular/core';
import {HttpService} from '../services/http.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {List} from '../models/list';
import {Priority} from '../models/priority';
import {Status} from '../models/status';
import {Card} from '../models/card';
import {CreateCardFormComponent} from '../create-card-form/create-card-form.component';
import {NgForOf, NgIf} from '@angular/common';
import {CardComponent} from '../card/card.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CreateCardFormComponent,
    NgIf,
    CardComponent,
    NgForOf
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {
  lists: List[] = [
    {
      idList: "asd123",
      title: "Titulo 1",
      description: "Descriasdp askdp asjdlj askdh alsjd lkasjdlasjdk jhashdkh askdjhn aksdhhk asjd "
    },
    {
      idList: "asd123",
      title: "Titulo 1",
      description: "Descriasdp askdp asjdlj askdh alsjd lkasjdlasjdk jhashdkh askdjhn aksdhhk asjd "
    },
    {
      idList: "asd123",
      title: "Titulo 1",
      description: "Descriasdp askdp asjdlj askdh alsjd lkasjdlasjdk jhashdkh askdjhn aksdhhk asjd "
    },
  ];
  cards: Card[] = [
    {
      idCard: "asdas123",
      title: "Titulo card",
      description: "asdk jlaskdh asdjhb alksjd kasdh lkasjdnkj ashdlkahs kdjhaskj das",
      startDate: new Date(),
      endDate: new Date(),
      status: Status.ToDo,
      priority: Priority.High,
      idList: "asd123",
    },
    {
      idCard: "asdas123",
      title: "Titulo card",
      description: "asdk jlaskdh asdjhb alksjd kasdh lkasjdnkj ashdlkahs kdjhaskj das",
      startDate: new Date(),
      endDate: new Date(),
      status: Status.ToDo,
      priority: Priority.High,
      idList: "asd123",
    },
    {
      idCard: "asdas123",
      title: "Titulo card",
      description: "asdk jlaskdh asdjhb alksjd kasdh lkasjdnkj ashdlkahs kdjhaskj das",
      startDate: new Date(),
      endDate: new Date(),
      status: Status.ToDo,
      priority: Priority.High,
      idList: "asd123",
    },
  ];
  isCreateCardFormOpen: boolean = false;
  selectedList: List | undefined;
  isCardOpen: boolean = false;
  selectedCard: Card | undefined;

  constructor(private http: HttpService) {}

  ngOnInit(): void {
    //this.getLists();
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
