import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {Card} from '../models/card';
import {NgForOf, NgIf} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Priority} from '../models/priority';
import {Status} from '../models/status';
import {HttpService} from '../services/http.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() card: Card | undefined;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();

  priorities: Priority[] = [Priority.Low, Priority.Medium, Priority.High];
  statuses: Status[] = [Status.ToDo, Status.InProcess, Status.Done, Status.Backlog, Status.Blocked];

  cardForm: FormGroup;

  constructor(private httpService: HttpService, private fb: FormBuilder) {
    this.cardForm = this.fb.group({
      title: [''],
      description: [''],
      priority: [''],
      status: [''],
      startDate: [''],
      endDate: [''],
    });
  }

  getPriorityName(priority: Priority): string {
    return Priority[priority];
  }

  getStatusName(status: Status): string {
    return Status[status];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['card'] && this.card) {
      this.cardForm.patchValue({
        title: this.card.title,
        description: this.card.description,
        priority: this.card.priority,
        status: this.card.status,
        startDate: this.formatDate(this.card.startDate),
        endDate: this.formatDate(this.card.endDate)
      });
    }
  }

  formatDate(date: any): string {
    if (date instanceof Date) {
      return date.toISOString().split('T')[0];
    } else if (typeof date === 'string') {
      return date.split('T')[0];
    }
    return date;
  }

  onSubmit(): void {
    if (this.card && this.card.idCard) {
      this.httpService.putCard(
        this.cardForm.value.description,
        this.cardForm.value.endDate,
        this.card.idList,
        this.cardForm.value.priority,
        this.cardForm.value.startDate,
        this.cardForm.value.status,
        this.cardForm.value.title,
        this.card.idCard
      ).subscribe(
        (response: any): void => {
        this.close();
        this.refresh.emit();
      }, (err: HttpErrorResponse): void => {
          console.log(err);
        }
      );
    }
  }

  deleteCard(): void {
    if (this.card && this.card.idCard) {
      this.httpService.deleteCard(this.card.idCard).subscribe(
        (response: any): void => {

        }, (err: HttpErrorResponse): void => {
          console.log(err);
        }
      );
    }
  }

  close(): void {
    this.closeModal.emit();
  }
}
