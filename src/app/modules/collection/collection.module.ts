import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFirestore } from 'angularfire2/firestore';

import { MaterialModule } from '@material/material.module';
import { RoutingModule } from '@collection/routing/routing.module';

import { CollectionService } from '@collection/services/collection.service';

import { CollectionsComponent } from '@collection/components/collections/collections.component';
import { CreateCollectionComponent } from '@collection/components/create-collection/create-collection.component';
import { CreateCollectionBtnComponent } from '@collection/components/create-collection-btn/create-collection-btn.component';
import { EditCollectionComponent } from './components/edit-collection/edit-collection.component';
import { ViewCollectionComponent } from './components/view-collection/view-collection.component';
import { CardComponent } from './components/card/card.component';
import { CardSideComponent } from './components/card-side/card-side.component';
import { CreateCardBtnComponent } from './components/create-card-btn/create-card-btn.component';
import { CreateCardComponent } from './components/create-card/create-card.component';
import { EditCardComponent } from './components/edit-card/edit-card.component';
import { DeleteCardDialogComponent } from './components/delete-card-dialog/delete-card-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { TrainingConfigurationViewComponent } from './components/training-configuration-view/training-configuration-view.component';
import { TrainingViewComponent } from './components/training-view/training-view.component';
import { StopTrainingDialogComponent } from './components/stop-training-dialog/stop-training-dialog.component';
import { TrainingStatisticsComponent } from './components/training-statistics/training-statistics.component';
import { ChartsModule } from 'ng2-charts';
import { TrainingStatisticsContainerComponent } from './containers/training-statistics-container/training-statistics-container.component';

@NgModule({
  imports: [
    CommonModule,
    RoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule
  ],
  declarations: [
    CollectionsComponent,
    CreateCollectionComponent,
    CreateCollectionBtnComponent,
    EditCollectionComponent,
    ViewCollectionComponent,
    CardComponent,
    CardSideComponent,
    CreateCardBtnComponent,
    CreateCardComponent,
    EditCardComponent,
    DeleteCardDialogComponent,
    TrainingConfigurationViewComponent,
    TrainingViewComponent,
    StopTrainingDialogComponent,
    TrainingStatisticsComponent,
    TrainingStatisticsContainerComponent
  ],
  exports: [
    CollectionsComponent,
    CreateCollectionComponent,
    CreateCollectionBtnComponent,
    EditCollectionComponent,
    ViewCollectionComponent,
    CardComponent,
    CardSideComponent,
    CreateCardBtnComponent,
    CreateCardComponent,
    EditCardComponent,
    DeleteCardDialogComponent,
    TrainingConfigurationViewComponent
  ],
  entryComponents: [DeleteCardDialogComponent, StopTrainingDialogComponent],
  providers: [AngularFirestore, CollectionService]
})
export class CollectionModule {}
