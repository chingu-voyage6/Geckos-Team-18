import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Collection } from '@collection/models/collection.model';
import { Card } from '@collection/models/card.model';
import { Observable } from 'rxjs';
import { CollectionService } from '@collection/services/collection.service';
import { DragScrollComponent } from 'ngx-drag-scroll/lib';

@Component({
  selector: 'app-training-view',
  templateUrl: './training-view.component.html',
  styleUrls: ['./training-view.component.css']
})
export class TrainingViewComponent implements OnInit {
  collection: Collection;
  cards: Observable<Card[]>;
  leftNavDisabled = false;
  rightNavDisabled = false;
  @ViewChild('scroll', { read: DragScrollComponent })
  ds: DragScrollComponent;
  constructor(
    private route: ActivatedRoute,
    private collectionService: CollectionService
  ) {}

  ngOnInit() {
    this.collection = this.route.snapshot.data.collection;
    this.cards = this.collectionService.getCollectionCards(this.collection.id);
  }
  moveLeft() {
    this.ds.moveLeft();
  }

  moveRight() {
    this.ds.moveRight();
  }
  leftBoundStat(reachesLeftBound: boolean) {
    this.leftNavDisabled = reachesLeftBound;
  }

  rightBoundStat(reachesRightBound: boolean) {
    this.rightNavDisabled = reachesRightBound;
  }

}
