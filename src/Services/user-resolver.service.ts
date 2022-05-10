import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';

@Injectable({ providedIn: 'root' })
export class UserResolverService implements Resolve<any> {
  constructor(private http: HttpClient, private userService: UsersService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    return this.userService.getUsers();
  }
}
