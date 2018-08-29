import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Collection } from '@collection/models/collection.model';
import { Location } from '@angular/common';
import { CollectionService } from '@collection/services/collection.service';

@Component({
  selector: 'app-stop-training-dialog',
  templateUrl: './stop-training-dialog.component.html',
  styleUrls: ['./stop-training-dialog.component.css']
})
export class StopTrainingDialogComponent implements OnInit {

  constructor(
  	public dialogRef: MatDialogRef<StopTrainingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Collection,
    private location: Location,
    private collectionService: CollectionService,
  	) { }

  ngOnInit() {}
  stop() {
      	this.location.back();
  }

  close() {
    this.dialogRef.close();
  }
}
