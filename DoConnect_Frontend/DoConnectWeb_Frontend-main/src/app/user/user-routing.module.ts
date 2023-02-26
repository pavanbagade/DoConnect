import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from '../guards/authUser/user.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostQuestionComponent } from './components/post-question/post-question.component';
import { ViewQuestionComponent } from './components/view-question/view-question.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent , canActivate:[UserGuard]},
  { path: 'post-question', component: PostQuestionComponent , canActivate:[UserGuard]},
  { path: 'view-question/:id', component: ViewQuestionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
