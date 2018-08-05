import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@material/material.module';
import { CollectionComponent } from '@shared/components/collection/collection.component';
import { RouterModule } from '@angular/router';
import { DeleteCollectionDialogComponent } from '@shared/components/delete-collection-dialog/delete-collection-dialog.component';

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule],
  declarations: [CollectionComponent, DeleteCollectionDialogComponent],
  exports: [CollectionComponent, DeleteCollectionDialogComponent],
  entryComponents: [DeleteCollectionDialogComponent]
})
export class SharedModule {}
