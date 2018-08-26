import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from '@auth/services/auth.service';
import { TrainingResult } from '@collection/models/training-result.model';
import { TrainingStatistics } from '@collection/models/training-statistics.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  trainingRef = this.afs.collection('trainings');
  statisticsRef = this.afs.collection('statistics');

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService
  ) {}

  getTrainingResults(
    collectionId: string,
    userId: string
  ): Observable<TrainingStatistics> {
    return this.afs
      .collection<TrainingStatistics>('statistics', ref =>
        ref
          .where('collectionId', '==', collectionId)
          .where('userId', '==', userId)
      )
      .valueChanges()
      .pipe(
        map((statistics: TrainingStatistics[]) => {
          return statistics[0];
        })
      );
  }

  postTrainingResult(result: TrainingResult) {
    return this.trainingRef.add(result);
  }
}
