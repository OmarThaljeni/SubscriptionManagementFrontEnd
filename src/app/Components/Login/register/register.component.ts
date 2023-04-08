import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/Services/Notification/toast.service';
import { RegisterService } from 'src/app/Services/Register/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isIdentique = false;
  confirmPasswordClass = 'form-control';
  newPassword = new FormControl(null, [
    (c: AbstractControl) => Validators.required(c),
    Validators.pattern(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    ),
  ]);
  confirmPassword = new FormControl('', [
    (c: AbstractControl) => Validators.required(c),
    Validators.pattern(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    ),
  ]);
  firstname = new FormControl('', [Validators.required, Validators.maxLength(20)]);
  lastname = new FormControl('', [Validators.required, Validators.maxLength(20)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  adress = new FormControl('', [Validators.required, Validators.maxLength(80)]);
  phone= new FormControl('', [Validators.required, Validators.pattern("[0-9 ]{8}")]);


  registerForm = this.formBuilder.group(
    {
      firstname : this.firstname,
      lastname : this.lastname,
      email : this.email,
      phone : this.phone,
      adress : this.adress,
      password: this.newPassword,
      confirmPassword: this.confirmPassword
    }
  );

  constructor(private formBuilder: FormBuilder, private changeDetectRef : ChangeDetectorRef, 
    private registerService : RegisterService, private router : Router, private toastService : ToastService) {}
  ngOnInit(): void {
  }
  
  register(credentials: any) {
    this.registerService.register(credentials).subscribe(
      () => {
        this.showSuccess();
        const link = ['SubscriptionManagement/login'];
        this.router.navigate(link);
      },
      error => {
        console.log(error);
      }
    );
    this.changeDetectRef.detectChanges();    
  }


  
checkIdenticalPassword() {
  let confirmP : String = this.registerForm.get('confirmPassword')?.value!;
  let newP : String = this.registerForm.get('password')?.value!;  
  if(confirmP === newP) {
    this.isIdentique = false;
  } else this.isIdentique = true;
  this.changeDetectRef.detectChanges();
}

showSuccess() {
  this.toastService.show('Registration Successful !', { classname: 'bg-success text-light', delay: 4500 ,autohide: true});
}


}
