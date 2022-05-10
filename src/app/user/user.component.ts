import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from 'src/Services/users.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  users: any;
  currentuser: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService,
    private toastr: ToastrService
  ) {
    this.users = this.route.snapshot.data['user'];
  }

  ngOnInit(): void {
    let username = localStorage.getItem('username');
    this.currentuser = this.users.find((x: any) => x.username === username);
    let id;
    if (this.currentuser) {
      id = this.currentuser.id;
    }
    if (localStorage.getItem('isAdmin') != 'true')
      this.router.navigate(['users/details', id]);
  }

  onDeleteUser(user: any) {
    let deleteUser = confirm(
      'are you sure you want to delete this user ' + user.name + '?'
    );
    if (deleteUser) {
      this.userService.deleteUser(user.id).subscribe((res) => {
        this.toastr.success('User deleted successfully');
        this.userService.getUsers().subscribe((users: any) => {
          this.users = users;
        });
      });
    }
  }

  editUser(user: any) {
    this.router.navigate(['users/edit-user', user.id]);
  }

  viewUser(user: any) {
    this.router.navigate(['users/details', user.id]);
  }
}
