import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], [this.forbiddenEmails.bind(this)])
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });

    // this.signupForm.valueChanges.subscribe((value) => {
    //   console.log(this.signupForm);
    // });

    this.signupForm.statusChanges.subscribe((status) => {
      console.log("Form status:", status);
    });

    this.signupForm.get('userData.email').statusChanges.subscribe((status) => {
      console.log("Email status:", status);
    });

    this.signupForm.setValue({
      'userData': {
        'username': 'Max',
        'email': 'dick@d.ick'
      },
      'gender': 'male',
      'hobbies': []
    });

    this.signupForm.patchValue({
      'userData': {
        'username': 'Anna'
      }
    });
  }

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset({
      'gender': 'male'
    });
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  // sync validator
  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};   // invalid
    }
    return null;  // valid
  }

  // async validator
  // will attach 'ng-pending' class in the mean time
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});    // invalid
        } else {
          resolve(null);  // valid
        }
      }, 1500);
    });

    return promise;
  }

}
