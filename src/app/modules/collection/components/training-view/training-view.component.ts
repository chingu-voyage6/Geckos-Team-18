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
import { Card } from '@collection/models/card.model';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { AuthService } from '@auth/services/auth.service';
import { CollectionService } from '@collection/services/collection.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
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
    private collectionService: CollectionService
    private location: Location,
    private trainingService: TrainingService
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

  get controls(): FormArray | null {
    return this.stepForm.get('controls') as FormArray;
  }

  compare(cards){
  let counter = 0;
  cards.forEach(card => {
  if (this.stepForm.value[card.id] == card.back.content) {
  counter++;
  }
  });
  console.log(
  `correct cards ${counter} out of ${cards.length} with score ${counter /
  cards.length}`
  );
  }



  finish() {
    this.collectionService.updateCollection(this.collection).then(() => {
      this.location.back();
    });
  }

  test() {
    this.trainingService
      .postTrainingResult({
        collectionId: this.collection.id,
        userId: this.user.uid,
        cards: 10,
        answered: 10
      })
      .then(() => {
        this.trainingService
          .getTrainingResults(this.collection.id, this.user.uid)
          .subscribe(result => {
            console.log(result);
          });
      });
  }
}
