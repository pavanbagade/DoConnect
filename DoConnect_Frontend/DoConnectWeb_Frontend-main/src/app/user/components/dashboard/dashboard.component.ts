import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QuestionService } from '../../user-services/question/question.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

 
  allquestions:any;
  validateForm!: FormGroup;
  tagsForm!: FormGroup;
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfTagOptions = [];
  currentPage:any = 1;
  total:any;
  searchMode = 1;
  isSpinning = false;

  constructor(private questionsService:QuestionService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
    });
   
    this.submitForm();
  }

  submitForm(): void {
    this.isSpinning = true;
    console.log('submit', this.validateForm.value);
    this.questionsService.searchQuestionByTitle(this.currentPage-1,this.validateForm.controls['title'].value).subscribe(res =>{
      console.log(res);
      this.total = res.data.totalPages*5;
      this.allquestions = res.data.questionDtoList;
      this.isSpinning = false;
    })
  }



  pageIndexChange(value){
    console.log(value);
    this.currentPage = value;
      this.submitForm();
    
  }


}