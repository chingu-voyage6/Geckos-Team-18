import { Component, OnInit, Input } from '@angular/core';
import { Collection } from '@collection/models/collection.model';
import { AuthService } from '@auth/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-training-configuration-view',
  templateUrl: './training-configuration-view.component.html',
  styleUrls: ['./training-configuration-view.component.css']
})

export class TrainingConfigurationViewComponent implements OnInit {
  @Input() collection: Collection;
  @Input() actionsEnabled: boolean = true;
  constructor(
  	public authService: AuthService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
  	this.collection = this.route.snapshot.data.collection
  }

}
