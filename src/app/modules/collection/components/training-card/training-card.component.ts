import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../../models/card.model';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-training-card',
  templateUrl: './training-card.component.html',
  styleUrls: ['../card/card.component.css']
})
export class TrainingCardComponent implements OnInit {
  @Input() card: Card;
  answerInput: FormGroup;
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private answerLog: FormBuilder
  ) {}

  ngOnInit() {
    this.answerInput = this.answerLog.group({
      answer: ['', [Validators.required]]
    });
  }

  get answer() {
    return this.answerInput.get('answer');
  }
}
