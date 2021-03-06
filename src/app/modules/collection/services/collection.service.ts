import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  CollectionReference,
  Query
} from 'angularfire2/firestore';
import { Collection } from '@collection/models/collection.model';
import { Observable, combineLatest } from 'rxjs';
import { AuthService } from '@auth/services/auth.service';
import { Card } from '@collection/models/card.model';
import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  constructor(
    private afs: AngularFirestore,
    private authService: AuthService
  ) {}

  get collections(): Observable<Collection[]> {
    return this.afs
      .collection<Collection>('collections', ref =>
        ref.where('public', '==', true)
      )
      .valueChanges();
  }

  getCollectionById(collectionId): Observable<Collection> {
    return this.afs
      .collection<Collection>('collections', ref =>
        ref.where('id', '==', collectionId)
      )
      .valueChanges()
      .pipe(map((collections: Collection[]) => collections[0]));
  }

  get userCollections(): Observable<Collection[]> {
    return this.afs
      .collection<Collection>('collections', ref => {
        return ref.where('authorId', '==', this.authService.uid);
      })
      .valueChanges();
  }

  createCollection(collection: Collection) {
    this.authService.user.subscribe(user => {
      collection.author = user.displayName;
      collection.authorId = user.uid;
      this.afs.collection<Collection>('collections').add(collection);
    });
  }

  updateCollection(collection: Collection) {
    return this.afs.doc(`collections/${collection.id}`).update(collection);
  }

  deleteCollection(collectionId: string) {
    return this.afs.doc(`collections/${collectionId}`).delete();
  }

  getCollectionCards(collectionId: string) {
    return this.afs
      .collection<Card>(`collections/${collectionId}/cards`)
      .valueChanges();
  }

  getCollectionCard(collectionId: string, cardId: string) {
    return this.afs
      .doc(`collections/${collectionId}/cards/${cardId}`)
      .valueChanges();
  }

  createCollectionCard(collectionId: string, card: Card) {
    return this.afs
      .collection<Card>(`collections/${collectionId}/cards`)
      .add(card);
  }

  updateCollectionCard(collectionId: string, card: Card) {
    return this.afs
      .doc(`collections/${collectionId}/cards/${card.id}`)
      .update(card);
  }

  deleteCollectionCard(collectionId: string, card: Card) {
    return this.afs
      .doc(`collections/${collectionId}/cards/${card.id}`)
      .delete();
  }

  search(terms: Observable<string>): Observable<Collection[]> {
    return terms.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(term => this.searchQuery(term))
    );
  }

  private searchQuery(searchTerm: string): Observable<Collection[]> {
    searchTerm = searchTerm.toLowerCase();
    const shared = this.afs
      .collection<Collection>('collections', ref =>
        ref
          .where('public', '==', true)
          .orderBy('lowerCaseName')
          .startAt(searchTerm)
          .endAt(searchTerm + '\uf8ff')
      )
      .valueChanges();

    if (this.authService.currentUser) {
      const authored = this.afs
        .collection<Collection>('collections', ref =>
          ref
            .where('authorId', '==', this.authService.uid)
            .where('public', '==', false)
            .orderBy('lowerCaseName')
            .startAt(searchTerm)
            .endAt(searchTerm + '\uf8ff')
        )
        .valueChanges();

      return combineLatest(shared, authored).pipe(
        map(([shared, authored]) => {
          return [...shared, ...authored];
        })
      );
    }

    return shared;
  }
}
