import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Card} from '../models/card';
import {NgForOf, NgIf} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Priority} from '../models/priority';
import {Status} from '../models/status';
import {HttpService} from '../services/http.service';

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

  priorities: any[] = Object.values(Priority);
  statuses: any[] = Object.values(Status);

  cardForm: FormGroup;

  constructor(private httpService: HttpService, private fb: FormBuilder) {
    this.cardForm = this.fb.group({
      title: [''],
      description: [''],
      priority: [Priority.High],
      status: [Status.Backlog],
      startDate: [new Date()],
      endDate: [new Date()],
    });
  }

  onSubmit(): void {
    if (this.card !== undefined && this.card.idCard !== undefined) {
      this.httpService.putCard(
        this.cardForm.value.description,
        this.cardForm.value.endDate,
        this.card.idList,
        this.cardForm.value.priority,
        this.cardForm.value.startDate,
        this.cardForm.value.status,
        this.cardForm.value.title,
        this.card.idCard
      ).subscribe(response => {
        this.close();
        this.refresh.emit();
      });
    }
  }

  close(): void {
    this.closeModal.emit();
  }
}
