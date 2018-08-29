import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

import { RoutingModule } from '@auth/routing/routing.module';
import { MaterialModule } from '@material/material.module';

import { AuthService } from '@auth/services/auth.service';

import { LoginComponent } from '@auth/components/login/login.component';
import { DisplayNameComponent } from '@auth/components/display-name/display-name.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RoutingModule, MaterialModule],
  declarations: [LoginComponent, DisplayNameComponent],
  exports: [LoginComponent, DisplayNameComponent],
  providers: [AuthService, AngularFireAuth, AngularFirestore]
})
export class AuthModule {}
