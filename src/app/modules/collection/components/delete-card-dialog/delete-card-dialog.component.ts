import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CollectionService } from '@collection/services/collection.service';

@Component({
  selector: 'app-delete-card-dialog',
  templateUrl: './delete-card-dialog.component.html',
  styleUrls: ['./delete-card-dialog.component.css']
})
export class DeleteCardDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteCardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private collectionService: CollectionService
  ) {}

  ngOnInit() {}
  delete() {
    this.collectionService
      .deleteCollectionCard(this.data.collectionId, this.data.card)
      .then(() => {
        this.dialogRef.close();
      });
  }

  close() {
    this.dialogRef.close();
  }
}
