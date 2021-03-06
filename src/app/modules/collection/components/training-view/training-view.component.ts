import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  AbstractControl,
  FormGroup,
  Validators,
  FormArray
} from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { Collection } from '@collection/models/collection.model';
import { StopTrainingDialogComponent } from '@collection/components/stop-training-dialog/stop-training-dialog.component';
import { Card } from '@collection/models/card.model';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { AuthService } from '@auth/services/auth.service';
import { CollectionService } from '@collection/services/collection.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { TrainingService } from '@collection/services/training.service';
import { User } from '@auth/models/user.model';

@Component({
  selector: 'app-training-view',
  templateUrl: './training-view.component.html',
  styleUrls: ['./training-view.component.css']
})
export class TrainingViewComponent implements OnInit {
  searchText: string;
  stepForm: FormGroup = new FormGroup({});
  @Input() collection: Collection;
  @Input() actionsEnabled: boolean = true;
  cards: Observable<Card[]>;
  user: User;
  constructor(
    private _formBuilder: FormBuilder,
    public authService: AuthService,
    private route: ActivatedRoute,
    private collectionService: CollectionService,
    private location: Location,
    private trainingService: TrainingService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.user = user;
    });
    this.collection = this.route.snapshot.data.collection;
    this.cards = this.collectionService
      .getCollectionCards(this.collection.id)
      .pipe(
        tap(cards => {
          cards.forEach(card => {
            this.stepForm.addControl(
              card.id,
              new FormControl('', [Validators.required])
            );
          });
        })
      );
  }

  stopTraining() {
    this.dialog.open(StopTrainingDialogComponent, {
      data: this.collection,
      panelClass: 'myapp-background-dialog'
    });
  }
  compare(cards) {
    let counter = 0;
    cards.forEach(card => {
      if (this.stepForm.value[card.id] == card.back.content) {
        counter++;
      }
    });

    this.trainingService
      .postTrainingResult({
        collectionId: this.collection.id,
        userId: this.user.uid,
        cards: cards.length,
        answered: counter
      })
      .then(() => {
        this.location.back();
      });
  }
}
