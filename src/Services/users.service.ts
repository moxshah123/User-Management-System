import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from 'src/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get('/api/users');
  }

  async getUserById(id: any) {
    let user;
    this.http.get('/api/users').subscribe((result: any) => {
      user = result.find((user: any) => user.id == id);
      return user;
    });
  }

  addUser(userModel: UserModel, isEdit: boolean, id: Number) {
    // add or edit user
    if (!isEdit) return this.http.post('/api/users', userModel);
    else return this.http.put(`/api/users/${id}`, userModel);
  }

  deleteUser(id: any) {
    return this.http.delete('/api/users/' + id);
  }
}
