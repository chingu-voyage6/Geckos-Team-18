import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  Output
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Collection } from '@collection/models/collection.model';
import { Card } from '@collection/models/card.model';
import { Observable } from 'rxjs';
import { CollectionService } from '@collection/services/collection.service';

@Component({
  selector: 'app-training-view',
  templateUrl: './training-view.component.html',
  styleUrls: ['./training-view.component.css']
})
export class TrainingViewComponent implements OnInit {
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
