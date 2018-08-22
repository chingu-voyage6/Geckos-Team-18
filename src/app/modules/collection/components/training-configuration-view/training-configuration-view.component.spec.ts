import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingConfigurationViewComponent } from './training-configuration-view.component';

describe('TrainingConfigurationViewComponent', () => {
  let component: TrainingConfigurationViewComponent;
  let fixture: ComponentFixture<TrainingConfigurationViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingConfigurationViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingConfigurationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
