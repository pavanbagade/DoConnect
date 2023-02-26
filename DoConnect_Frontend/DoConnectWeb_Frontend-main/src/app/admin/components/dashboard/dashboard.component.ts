import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AdminQuestionService } from '../../admin-services/question/admin-question.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  questions : any;
  answers:any;
  isSpinningQuestion = false;

  constructor(private adminQuestionService: AdminQuestionService,
    private notification: NzNotificationService,) { }

  ngOnInit(): void {
    this.getAllPostedQuestions();
  }

  getAllPostedQuestions(){
    this.isSpinningQuestion = true;
    this.adminQuestionService.getAllpendingQuestions().subscribe(res =>{
      console.log(res);
      this.questions = res.data;
      this.isSpinningQuestion = false;
    })
  }

  tabChanged(event){
    if(event.index){
      this.getAllPostedAnswers()
    }
  }

  getAllPostedAnswers(){
    this.isSpinningQuestion = true;
    this.adminQuestionService.getAllpendingAnswers().subscribe(res =>{
      console.log(res);
      this.answers = res.data;
      this.isSpinningQuestion = false;
    })
  }

  processImg(raw){
    return 'data:image/jpeg;base64,' + raw;
  }

  approveQuestion(id){
    this.isSpinningQuestion = true;
    this.adminQuestionService.approveQuestion(id).subscribe(res=>{
      if(res.status == 'OK'){
        this.getAllPostedQuestions();
        this.notification
        .success(
          'SUCCESS',
          `Question Approved Successfully!!!`,
          { nzDuration: 5000 }
        );
      }else{
        this.notification
        .error(
          'ERROR',
          `${res.message}`,
          { nzDuration: 5000 }
        );
      }
      this.isSpinningQuestion = false;
    })
  }

  approveAnswer(id){
    this.isSpinningQuestion = true;
    this.adminQuestionService.approveAnswer(id).subscribe(res=>{
      if(res.status == 'OK'){
        this.getAllPostedAnswers();
        this.notification
        .success(
          'SUCCESS',
          `Answer Approved Successfully!!!`,
          { nzDuration: 5000 }
        );
      }else{
        this.notification
        .error(
          'ERROR',
          `${res.message}`,
          { nzDuration: 5000 }
        );
      }
      this.isSpinningQuestion = false;
    })
  }

  deleteAnswer(id){
    this.isSpinningQuestion = true;
    this.adminQuestionService.deleteAnswer(id).subscribe(res=>{
      if(res.status == 'OK'){
        this.getAllPostedAnswers();
        this.notification
        .success(
          'SUCCESS',
          `Answer Deleted Successfully!!!`,
          { nzDuration: 5000 }
        );
      }else{
        this.notification
        .error(
          'ERROR',
          `${res.message}`,
          { nzDuration: 5000 }
        );
      }
      this.isSpinningQuestion = false;
    })
  }

  deleteQuestion(id){
    this.isSpinningQuestion = true;
    this.adminQuestionService.deleteQuestion(id).subscribe(res=>{
      if(res.status == 'OK'){
        this.getAllPostedQuestions();
        this.notification
        .success(
          'SUCCESS',
          `Question Deleted Successfully!!!`,
          { nzDuration: 5000 }
        );
      }else{
        this.notification
        .error(
          'ERROR',
          `${res.message}`,
          { nzDuration: 5000 }
        );
      }
      this.isSpinningQuestion = false;
    })
  }
}
