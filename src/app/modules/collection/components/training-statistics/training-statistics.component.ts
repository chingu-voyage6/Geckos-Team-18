import { Component, OnInit } from '@angular/core';
import { TrainingService } from '@collection/services/training.service';
import { Observable } from 'rxjs';
import { TrainingStatistics } from '@collection/models/training-statistics.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-training-statistics',
  templateUrl: './training-statistics.component.html',
  styleUrls: ['./training-statistics.component.css']
})
export class TrainingStatisticsComponent implements OnInit {
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
