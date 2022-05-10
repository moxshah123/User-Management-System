import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/Services/users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  id: number | undefined;
  user: any;
  canView: any;
  isAdmin: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getUser();
  }

  getUser() {
    if (this.id) {
      this.isAdmin = localStorage.getItem('isAdmin');
      this.userService.getUsers().subscribe((users: any) => {
        this.user = users.find((user: any) => user.id == this.id);
        if (
          this.user.username !== localStorage.getItem('username') &&
          this.isAdmin != 'true'
        ) {
          this.toastr.error('You are not allowed to view other users');
          this.router.navigate(['/']);
        }
      });
    }
  }

  editUser() {
    this.router.navigate(['users/edit-user', this.id]);
  }
}
