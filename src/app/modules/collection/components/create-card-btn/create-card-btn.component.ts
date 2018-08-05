import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-card-btn',
  templateUrl: './create-card-btn.component.html',
  styleUrls: ['./create-card-btn.component.css']
})
export class CreateCardBtnComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}

  get canCreate(): boolean {
    if (this.authService.currentUser) {
      return (
        this.authService.uid == this.route.snapshot.data.collection.authorId
      );
    } else {
      return false;
    }
  }
}
