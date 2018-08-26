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
  constructor(
    private _formBuilder: FormBuilder,
    public authService: AuthService,
    private route: ActivatedRoute,
    private location: Location,
    private collectionService: CollectionService
  ) {}

  ngOnInit() {
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
    console.log(this.stepForm.value);
  }
}
