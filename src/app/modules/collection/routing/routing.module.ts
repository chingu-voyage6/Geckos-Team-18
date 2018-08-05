import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CollectionsComponent } from '@collection/components/collections/collections.component';
import { CreateCollectionComponent } from '@collection/components/create-collection/create-collection.component';
import { CreateCardComponent } from '@collection/components/create-card/create-card.component';
import { CardComponent } from '@collection/components/card/card.component';
import { EditCardComponent } from '@collection/components/edit-card/edit-card.component';
import { EditCollectionComponent } from '@collection/components/edit-collection/edit-collection.component';
import { CollectionGuard } from '@collection/guards/collection.guard';
import { CardGuard } from '@collection/guards/card.guard';
import { ViewCollectionComponent } from '@collection/components/view-collection/view-collection.component';
import { AuthGuard } from '@auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: CollectionsComponent
      },
      {
        path: 'create',
        component: CreateCollectionComponent
      },
      {
        path: 'edit/:id',
        component: EditCollectionComponent,
        resolve: {
          collection: CollectionGuard
        }
      }
    ]
  },
  {
    path: 'view/:id',
    resolve: {
      collection: CollectionGuard,
      cards: CardGuard
    },
    children: [
      {
        path: '',
        component: ViewCollectionComponent
      },
      {
        path: 'create',
        component: CreateCardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'edit-card/:cardId',
        component: EditCardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CollectionGuard, CardGuard]
})
export class RoutingModule {}
