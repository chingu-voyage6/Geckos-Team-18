import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Card } from '../../models/card.model';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-training-card',
  templateUrl: './training-card.component.html',
  styleUrls: ['../card/card.component.css']
})
export class TrainingCardComponent implements OnInit {
  @Input() card: Card;
  @Output() valid = new EventEmitter<boolean>();
  answerInput: FormGroup;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.answerInput = this.fb.group({
      answer: ['', [Validators.required, Validators.minLength(4)]]
    });
    this.isValid();
  }

  get answerLog() {
    return this.answerInput.get('answer');
  }

  isValid() {
    this.valid.emit(this.answerInput.valid);
  }
}
