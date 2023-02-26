import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';
import { QuestionService } from '../../user-services/question/question.service';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.scss']
})
export class ViewQuestionComponent implements OnInit {

 
  id: any = this.activatedroute.snapshot.params['id'];
  question: any;
  validateForm: any;
  isSpinning = false;
  isSpinningQuestion = false;
  images = [];
  files: any;

  answers = [];
  value: number[] = [];

  formData: FormData = new FormData();
  displayAnsAppBtns: boolean = false;


  constructor(private activatedroute: ActivatedRoute,
    private questionsService: QuestionService,
    private notification: NzNotificationService,
    private fb: FormBuilder,
    ) { }

    // private answerService: AnswerService

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      body: [null, [Validators.required]],
      files: [null, []],
    });
    this.getQuestionById();
  }

  getQuestionById() {
    this.isSpinningQuestion = true;
    this.questionsService.getQuestionById(this.id).subscribe(res => {
      console.log(res);
      this.answers = [];
      this.question = res.data.questionDto;
      res.data.answerDtoList.forEach(element => {
        if (element.returnedImg != null) {
          element.convertedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        }
        this.answers.push(element);
      });
      if (UserStorageService.getUserId() == this.question.user_id) {
        this.displayAnsAppBtns = true;
      }
    })
    this.isSpinningQuestion = false;
  }



  onFileChange(event: any) {
    if (event.target.files) {
      // console.log(event.target.files[0]);
      this.files = event.target.files[0];
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        console.log(event.target.files[i])
        this.formData.append('files', event.target.files[i]);
        reader.onload = (event: any) => {
          console.log(event.target.result);
          this.images = [];
          this.images.push(event.target.result);
          console.log(event.target.files);

        }

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  addAnswer() {
    if (this.validateForm.valid) {
      this.isSpinning = true;
      const data = this.validateForm.value;
      data.question_id = this.id;
      data.user_id = UserStorageService.getUserId();

      if(this.files!=null){
        this.formData.append("img", this.files);
      }
     
      this.formData.append("user_id", UserStorageService.getUserId());
      this.formData.append("question_id", this.id);
      this.formData.append("body", this.validateForm.get(['body'])!.value);


      this.questionsService.addAnswer(this.formData).subscribe((res) => {
          if (res.message == "Answer Added Successfully") {
            this.validateForm.reset();
            this.getQuestionById();
            this.files = null;
            this.images = null;
            this.notification
              .success(
                'SUCCESS',
                `Answer Posted Successfully!!!`,
                { nzDuration: 5000 }
              );
          } else {
            this.notification
              .error(
                'ERROR',
                `${res.message}`,
                { nzDuration: 5000 }
              )
          }
          this.isSpinning = false;
     

      });
    } else {
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }}
}
