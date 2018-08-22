import { Component, OnInit, Input } from '@angular/core';
import { DeleteCardDialogComponent } from '@collection/components/delete-card-dialog/delete-card-dialog.component';
import { Card } from '../../models/card.model';
import { Collection } from '../../models/collection.model';
import { MatDialog } from '@angular/material';
import { AuthService } from '@auth/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  animations: [
    trigger('cardReverse', [
      state(
        'showFront',
        style({
          transform: 'rotateY(360deg)'
        })
      ),
      state(
        'hideFront',
        style({
          transform: 'rotateY(180deg)'
        })
      ),
      state(
        'showBack',
        style({
          transform: 'rotateY(180deg)'
        })
      ),
      state(
        'hideBack',
        style({
          transform: 'rotateY(360deg)'
        })
      ),
      transition('showFront => hideFront', animate('1000ms ease-out')),
      transition('hideFront => showFront', animate('1000ms ease-in')),
      transition('showBack => hideBack', animate('1000ms ease-out')),
      transition('hideBack => showBack', animate('1000ms ease-in'))
    ])
  ]
})
export class CardComponent implements OnInit {
  show = true;
  @Input() card: Card;
  collection: Collection;
  @Input() actionsEnabled: boolean = true;
  constructor(public dialog: MatDialog, private route: ActivatedRoute, public authService: AuthService) {}

  ngOnInit() {
    this.collection = this.route.snapshot.data.collection
  }

  get frontReverse() {
    return this.show ? 'showFront' : 'hideFront';
  }

  get backReverse() {
    return this.show ? 'showBack' : 'hideBack';
  }

  toggle() {
    this.show = !this.show;
  }



  deleteCard() {
    this.dialog.open(DeleteCardDialogComponent, {
      panelClass: 'myapp-background-dialog',
      data: { collectionId: this.route.snapshot.params.id, card: this.card}, 
    });
  }
}
