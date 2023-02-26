import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostQuestionComponent } from './components/post-question/post-question.component';
import { DemoNgZorroAntdModule } from '../DemoNgZorroAntdModule';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewQuestionComponent } from './components/view-question/view-question.component';


@NgModule({
  declarations: [
    UserComponent,
    DashboardComponent,
    PostQuestionComponent,
    ViewQuestionComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    DemoNgZorroAntdModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
