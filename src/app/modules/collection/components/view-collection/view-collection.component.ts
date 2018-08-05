import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Collection } from '@collection/models/collection.model';
import { Card } from '@collection/models/card.model';
import { Observable } from 'rxjs';
import { CollectionService } from '@collection/services/collection.service';

@Component({
  selector: 'app-view-collection',
  templateUrl: './view-collection.component.html',
  styleUrls: ['./view-collection.component.css']
})
export class ViewCollectionComponent implements OnInit {
  collection: Collection;
  cards: Observable<Card[]>;
  constructor(
    private route: ActivatedRoute,
    private collectionService: CollectionService
  ) {}

  ngOnInit() {
    this.collection = this.route.snapshot.data.collection;
    this.cards = this.collectionService.getCollectionCards(this.collection.id);
  }
}
