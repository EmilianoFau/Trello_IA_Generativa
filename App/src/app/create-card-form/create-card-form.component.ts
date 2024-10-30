import { Component, Input, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { HttpService } from '../services/http.service';
import { Priority } from '../models/priority';
import { Status } from '../models/status';
import {NgForOf, NgIf} from '@angular/common';
import {List} from '../models/list';

@Component({
  selector: 'app-create-card-form',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './create-card-form.component.html',
  styleUrl: './create-card-form.component.css'
})
export class CreateCardFormComponent {
  @Input() list: List | undefined;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();
  priorities: any[] = Object.values(Priority);
  statuses: any[] = Object.values(Status);

  cardForm: FormGroup;

  constructor(private httpService: HttpService, private fb: FormBuilder) {
    this.cardForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: [Priority.High, Validators.required],
      status: [Status.Backlog, Validators.required],
      startDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required],
    });
  }

  onSubmit(): void {
    if (this.list !== undefined && this.list.idList) {
      this.httpService.postCard(
        this.cardForm.value.description,
        this.cardForm.value.endDate,
        this.list.idList,
        this.cardForm.value.priority,
        this.cardForm.value.startDate,
        this.cardForm.value.status,
        this.cardForm.value.title
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
