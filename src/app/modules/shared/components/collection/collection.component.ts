import { Component, OnInit, Input } from '@angular/core';
import { Collection } from '@collection/models/collection.model';
import { MatDialog } from '@angular/material';
import { DeleteCollectionDialogComponent } from '@shared/components/delete-collection-dialog/delete-collection-dialog.component';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  @Input() collection: Collection;
  @Input() actionsEnabled: boolean = true;
  constructor(public dialog: MatDialog, public authService: AuthService) {}

  ngOnInit() {}

  deleteCollection() {
    this.dialog.open(DeleteCollectionDialogComponent, {
      data: this.collection,
      panelClass: 'myapp-background-dialog'
    });
  }
}
