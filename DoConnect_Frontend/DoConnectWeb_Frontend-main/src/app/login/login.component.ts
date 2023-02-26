import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AdminAuthService } from '../services/adminAuth/admin-auth.service';
import { AuthService } from '../services/auth/auth.service';
import { UserStorageService } from '../services/storage/user-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validateForm!: FormGroup;
  isSpinning = false;

  submitForm(): void {
    this.isSpinning = true;
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if(this.validateForm.get(['role'])!.value == '1'){
      const data = {
        username:this.validateForm.get(['userName'])!.value,
        password:this.validateForm.get(['password'])!.value
      }
      this.adminAuthService.sigin(data).subscribe(res=>{
       this.isSpinning = false;
       if(res.status == 'OK'){
        console.log(res.data);
        this.userStorageService.saveUser(res.data);
        this.router.navigateByUrl('admin/dashboard');
       }
       else{
        this.notification
        .error(
          'ERROR',
          `${res.message}`,
          { nzDuration: 5000 }
        );
       }
    
         
      })
    }else{
      this.authService.login(this.validateForm.get(['userName'])!.value,this.validateForm.get(['password'])!.value).subscribe(res=>{
        this.isSpinning = false;
        if(UserStorageService.isUserLoggedIn()){
         this.router.navigateByUrl('user/dashboard');
        }
        else if(UserStorageService.isAdminLoggedIn()){
         this.router.navigateByUrl('admin/dashboard');
        }
          
       },error=>{
         this.isSpinning = false;
         this.notification
             .error(
               'ERROR',
               `Bad credentials`,
               { nzDuration: 5000 }
             )
       })
    }
 

  }

  constructor(private fb: FormBuilder, 
              private authService:AuthService,
              private notification: NzNotificationService,
              private adminAuthService:AdminAuthService,
              private userStorageService: UserStorageService,
              private router: Router,) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      role: [null, [Validators.required]],
      remember: [true]
    });
  }




}