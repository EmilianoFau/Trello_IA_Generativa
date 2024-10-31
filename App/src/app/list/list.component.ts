import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {HttpService} from '../services/http.service';
import {HttpErrorResponse} from '@angular/common/http';
import {List} from '../models/list';

@Component({
  selector: 'app-list',
  standalone: true,
    imports: [
        NgForOf,
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  @Input() list: List | undefined;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();

  listForm: FormGroup;

  constructor(private httpService: HttpService, private fb: FormBuilder) {
    this.listForm = this.fb.group({
      title: [''],
      description: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['list'] && this.list) {
      this.listForm.patchValue({
        title: this.list.title,
        description: this.list.description
      });
    }
  }

  onSubmit(): void {
    if (this.list && this.list.idList) {
      this.httpService.putList(
        this.list.idList,
        this.listForm.value.title,
        this.listForm.value.description,
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

  close(): void {
    this.closeModal.emit();
  }
}
