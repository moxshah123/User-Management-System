import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/Services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  isSubmitted: boolean = false;
  constructor(
    private form_builder: FormBuilder,
    private loginService: LoginService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeFormCotrols();
  }
  initializeFormCotrols() {
    this.loginForm = this.form_builder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]],
    });
  }

  get _loginForm() {
    return this.loginForm.controls;
  }

  onLogin() {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      this.loginService.login().subscribe((result: any) => {
        let userexist = result.find(
          (x: any) =>
            x.username === this.loginForm.value.username &&
            x.password === this.loginForm.value.password
        );
        if (userexist) {
          this.toastr.success('Loggedin successfully');
          localStorage.setItem('username', this.loginForm.value.username);
          localStorage.setItem('isAdmin', userexist.isAdmin);
          this.router.navigate(['/users']);
          localStorage.setItem('latestId', result[result.length - 1].id);
        } else {
          this.toastr.error('User does not exist');
        }
      });
    }
  }
}
