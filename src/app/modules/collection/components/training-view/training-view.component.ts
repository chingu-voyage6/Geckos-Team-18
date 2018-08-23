import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, AbstractControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { Collection } from '@collection/models/collection.model';
import { Card } from '@collection/models/card.model';
import { Observable } from 'rxjs';
import { AuthService } from '@auth/services/auth.service';
import { CollectionService } from '@collection/services/collection.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-training-view',
  templateUrl: './training-view.component.html',
  styleUrls: ['./training-view.component.css']
})
export class TrainingViewComponent implements OnInit {
  isLinear = true;
  isEditable = false;
  searchText: string;
  firstFormGroup: FormGroup;
  @Input() collection: Collection;
  @Input() actionsEnabled: boolean = true;
  inputs: FormArray;
  cards: Card[];
  constructor(
  	private _formBuilder: FormBuilder,
  	public authService: AuthService,
    private route: ActivatedRoute,
    private collectionService: CollectionService
  	) { }

  ngOnInit() {
  	this.collection = this.route.snapshot.data.collection;
  	this.collectionService.getCollectionCards(this.collection.id).subscribe(cards => {
  		this.cards = cards;
  		cards.forEach(card => {
  			this.inputs.push(new FormControl(card.title, Validators.required))
  		})
  	});
  	this.firstFormGroup = this._formBuilder.group({
  		controls: this.inputs
  	})
  }

  get search() {
  	return this.firstFormGroup.get('firstCtrl');
  }

  get controls(): AbstractControl | null {
  	return this.firstFormGroup.get('controls')
  }

  reset() {
  	this.firstFormGroup.reset();
  }
}
