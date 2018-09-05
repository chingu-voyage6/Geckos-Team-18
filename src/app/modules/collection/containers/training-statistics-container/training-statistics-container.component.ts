import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TrainingStatistics } from '@collection/models/training-statistics.model';
import { TrainingService } from '@collection/services/training.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-training-statistics-container',
  templateUrl: './training-statistics-container.component.html',
  styleUrls: ['./training-statistics-container.component.css']
})
export class TrainingStatisticsContainerComponent implements OnInit {
  results: Observable<TrainingStatistics>;
  constructor(
    private trainingService: TrainingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.results = this.trainingService.getTrainingResults(
      this.route.snapshot.data.collection.id,
      this.route.snapshot.data.user.uid
    );
  }
}
