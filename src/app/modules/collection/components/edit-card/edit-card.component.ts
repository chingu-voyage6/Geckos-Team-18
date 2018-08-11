import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CollectionService } from '@collection/services/collection.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { Card } from '@collection/models/card.model';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.css']
})
export class EditCardComponent implements OnInit, OnDestroy {
  editCard: FormGroup;
  cardSubscription: Subscription;
  constructor(
    private editBuilder: FormBuilder,
    private updateService: CollectionService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.editCard = this.editBuilder.group({
      name: ['', [Validators.required]],
      front: ['', [Validators.required]],
      back: ['', [Validators.required]]
    });
    this.cardSubscription = this.updateService
      .getCollectionCard(
        this.route.snapshot.params.id,
        this.route.snapshot.params.cardId
      )
      .subscribe((card: Card) => {
        this.name.setValue(card.title),
          this.front.setValue(card.front.content),
          this.back.setValue(card.back.content);
      });
  }
  save() {
    this.updateService
      .updateCollectionCard(this.route.snapshot.params.id, {
        title: this.name.value,
        id: this.route.snapshot.params.cardId,
        front: { content: this.front.value },
        back: { content: this.back.value }
      })
      .then(() => {
        this.location.back();
      });
  }
  get name() {
    return this.editCard.get('name');
  }

  get front() {
    return this.editCard.get('front');
  }

  get back() {
    return this.editCard.get('back');
  }

  ngOnDestroy() {
    this.cardSubscription.unsubscribe();
  }
}
