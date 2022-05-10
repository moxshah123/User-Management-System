import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/models/user.model';
import { UsersService } from 'src/Services/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup = new FormGroup({});
  isEdit: boolean = false;
  userId: any;
  isSubmitted = false;
  emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  mobileRegex = /^(7|8|9)\d{9}$/;
  userModel: UserModel = new UserModel();
  isAdmin: any;
  user: any;
  allUsers: any;
  // createUserPermission = false
  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.params['id'];
    this.initializeFormControls();
    this.isAdmin = localStorage.getItem('isAdmin');
    if (!this.isAdmin && !this.userId) this.router.navigate(['users']);
    if (this.userId) this.isEdit = true;
    this.getUser();
  }

  initializeFormControls() {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      phone: ['', [Validators.required, Validators.pattern(this.mobileRegex)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get _userForm() {
    return this.userForm.controls;
  }

  getUser() {
    if (this.isEdit) {
      this.isAdmin = localStorage.getItem('isAdmin');
      this.userService.getUsers().subscribe((users: any) => {
        this.allUsers = users;
        this.user = users.find((user: any) => user.id == this.userId);
        if (
          this.user.username !== localStorage.getItem('username') &&
          this.isAdmin != 'true'
        ) {
          this.toastr.error('You are not allowed to edit other users');
          this.router.navigate(['/']);
        } else {
          this.bindForUpdate();
        }
      });
    }
  }

  bindForUpdate() {
    this.userForm.patchValue({
      name: this.user.name,
      username: this.user.username,
      email: this.user.email,
      phone: this.user.phone,
      password: this.user.password,
    });
  }

  bindToUserModel() {
    let latestId = localStorage.getItem('latestId');
    this.userModel.id = !this.isEdit ? Number(latestId) + 1 : this.user.id;
    this.userModel.email = this.userForm.controls['email'].value;
    this.userModel.name = this.userForm.controls['name'].value;
    this.userModel.username = this.userForm.controls['username'].value;
    this.userModel.phone = this.userForm.controls['phone'].value;
    this.userModel.isAdmin = this.isEdit ? this.user.isAdmin : false;
    this.userModel.password = this.userForm.controls['password'].value;
  }

  addUser() {
    if (this.userForm.valid) {
      this.bindToUserModel();
      this.userService
        .addUser(this.userModel, this.isEdit, this.userId)
        .subscribe((result) => {
          this.isAdmin
            ? this.router.navigate(['/users'])
            : this.router.navigate(['/']);
        });
    } else {
      this.toastr.error('please enter required & valid data');
    }
  }
}
