import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { QuestionService } from '../../user-services/question/question.service';

@Component({
  selector: 'app-post-question',
  templateUrl: './post-question.component.html',
  styleUrls: ['./post-question.component.scss']
})
export class PostQuestionComponent implements OnInit {

  
  isSpinning = false;
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfTagOptions = [];

  constructor(private fb: FormBuilder,
              private notification: NzNotificationService,
              private router: Router,
              private questionsService: QuestionService) {}

  validateForm!: FormGroup;


  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: [null, [ Validators.required]],
      body: [null, [Validators.required]],
     
    });
  }


  submitForm(): void {
    console.log(this.validateForm.valid);
    console.log(this.validateForm);
    if(this.validateForm.valid){
      console.log("In function");
      this.isSpinning = true;
      this.questionsService.postQuestion(this.validateForm.value).subscribe((res)=>{
        this.isSpinning = false;
        if(res.status == "CREATED"){
          this.notification
          .success(
            'SUCCESS',
            `Question Posted Successfully!!!`,
            { nzDuration: 5000 }
          );
          this.router.navigateByUrl('/user/dashboard');
        }else{
          this.notification
          .error(
            'ERROR',
            `${res.message}`,
            { nzDuration: 5000 }
          )
        }
      });
    }else{
      for (const i in this.validateForm.controls) {
          this.validateForm.controls[i].markAsDirty();
          this.validateForm.controls[i].updateValueAndValidity();
        }
    }
  }
}
