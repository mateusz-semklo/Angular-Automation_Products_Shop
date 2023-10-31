import { Component } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AppError} from "../../common/errors/AppError";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  invalidLogin: boolean = false;

  form: FormGroup = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    }
  );

  constructor(public auth: AuthService, private router: Router) {
  }

  signIn() {
    console.log(this.form.value);
    this.auth.login(this.form.value)
      .subscribe({
          next: (result) => {
            if (result) {
              this.router.navigate(['/']);
            } else
              this.invalidLogin = true;
          },
          error: (error: AppError) => {
            this.invalidLogin = true;
          }
        }
      )
  }
}
