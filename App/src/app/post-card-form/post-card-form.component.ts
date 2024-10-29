import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { Priority } from '../models/priority';
import { Status } from '../models/status';

@Component({
  selector: 'app-post-card-form',
  standalone: true,
  imports: [],
  templateUrl: './post-card-form.component.html',
  styleUrl: './post-card-form.component.css'
})
export class PostCardFormComponent {
  @Input() task: any;
  @Input() isEdit: boolean = false;
  @Input() taskData: any = {};
  @Input() priorities: Priority[] = [];
  @Input() statuses: Status[] = [];
  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<any>();

  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private httpService: HttpService) {
    this.taskForm = this.fb.group({
      title: [''],
      description: [''],
      startDate: [''],
      endDate: [''],
      priority: [''],
      status: ['']
    });
  }

  ngOnInit() {
    if (this.isEdit && this.task) {
      this.taskForm.patchValue(this.task);
    }
  }

  saveTask() {
    const taskData = this.taskForm.value;
    
  if (this.isEdit) {
    this.httpService.putCard(
      taskData.description,
      taskData.endDate,
      this.task.idList,
      taskData.priority,
      taskData.startDate,
      taskData.status,
      taskData.title,
      this.task.idCard
    ).subscribe(response => {
      this.onSave.emit(response);
      this.onClose.emit();
    });
  } else {
    this.httpService.postCard(
      taskData.description,
      taskData.endDate,
      taskData.idList,
      taskData.priority,
      taskData.startDate,
      taskData.status,
      taskData.title
    ).subscribe(response => {
      this.onSave.emit(response);
      this.onClose.emit();
    });
  }}

  closeCardModal() {
    this.onClose.emit();
  }
}
