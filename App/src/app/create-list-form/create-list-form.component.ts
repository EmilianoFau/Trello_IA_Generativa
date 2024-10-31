import {Component, EventEmitter, Output} from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpService} from '../services/http.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-create-list-form',
  standalone: true,
    imports: [
        NgForOf,
        ReactiveFormsModule
    ],
  templateUrl: './create-list-form.component.html',
  styleUrl: './create-list-form.component.css'
})
export class CreateListFormComponent {
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();

  listForm: FormGroup;

  constructor(private httpService: HttpService, private fb: FormBuilder) {
    this.listForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.httpService.postList(
      this.listForm.value.description,
      this.listForm.value.title
    ).subscribe(
      (response: any): void => {
        this.close();
        this.refresh.emit();
      }, (err: HttpErrorResponse): void => {
        console.log(err);
      }
    );
  }

  close(): void {
    this.closeModal.emit();
  }
}
