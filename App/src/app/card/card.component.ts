import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {Card} from '../models/card';
import {NgForOf, NgIf} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
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

  cardForm: FormGroup;

  constructor(private httpService: HttpService, private fb: FormBuilder) {
    this.cardForm = this.fb.group({
      title: [''],
      description: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['card'] && this.card) {
      this.cardForm.patchValue({
        title: this.card.title,
        description: this.card.description,
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
        this.card.idList,
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
          this.close();
          this.refresh.emit();
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
