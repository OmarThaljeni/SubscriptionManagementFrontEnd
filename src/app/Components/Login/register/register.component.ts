import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  passwordsMatching = false;
  isConfirmPasswordDirty = false;
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
  firstName = new FormControl('', [Validators.required, Validators.maxLength(20)]);
  lastName = new FormControl('', [Validators.required, Validators.maxLength(20)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  adress = new FormControl('', [Validators.required, Validators.maxLength(80)]);
  phone= new FormControl('', [Validators.required, Validators.pattern("[0-9 ]{8}")]);


  registerForm = this.formBuilder.group(
    {
      firstName : this.firstName,
      lastName : this.lastName,
      email : this.email,
      phone : this.phone,
      adress : this.adress,
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword
    }
  );

  constructor(private formBuilder: FormBuilder, private changeDetectRef : ChangeDetectorRef) {}

  ngOnInit(): void {
  }
  

  onSubmit(): void {
    console.log(this.registerForm.valid);
    console.log(this.registerForm);
    this.changeDetectRef.detectChanges();
    console.log('===> ',Object.values(this.registerForm.controls).filter(c => c.invalid));
    

  }

  
checkIdenticalPassword() {
  
  let confirmP : String = this.registerForm.get('confirmPassword')?.value!;
  let newP : String = this.registerForm.get('newPassword')?.value!;  
  if(confirmP === newP) {
    this.isIdentique = false;
  } else this.isIdentique = true;
  this.changeDetectRef.detectChanges();
}

}
