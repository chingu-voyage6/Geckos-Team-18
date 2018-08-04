import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Collection } from '@collection/models/collection.model';
import { Card } from '@collection/models/card.model';
import { CollectionService } from '@collection/services/collection.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete-card-dialog',
  templateUrl: './delete-card-dialog.component.html',
  styleUrls: ['./delete-card-dialog.component.css']
})
export class DeleteCardDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteCardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Card,
    private collectionService: CollectionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}
  delete() {
    this.collectionService
      .deleteCollectionCard(this.route.snapshot.params.id, this.data)
      .then(() => {
        this.close();
      });
  }

  close() {
    this.dialogRef.close();
  }
}
