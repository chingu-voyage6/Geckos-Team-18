import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingStatisticsContainerComponent } from './training-statistics-container.component';

describe('TrainingStatisticsContainerComponent', () => {
  let component: TrainingStatisticsContainerComponent;
  let fixture: ComponentFixture<TrainingStatisticsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingStatisticsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingStatisticsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
