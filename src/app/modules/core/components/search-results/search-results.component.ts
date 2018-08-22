import { Component, OnInit } from '@angular/core';
import { Collection } from '@collection/models/collection.model';
import { CollectionService } from '@collection/services/collection.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  collections: Observable<Collection[]>;

  constructor(
    private collectionService: CollectionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.collections = this.collectionService.search(
      this.route.queryParams.pipe(map(term => term['q']))
    );
  }
}
