import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanLoadGuard } from 'src/auth-guards/can-load.guard';
import { UserResolverService } from 'src/Services/user-resolver.service';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    resolve: {
      user: UserResolverService,
    },
    canActivate: [CanLoadGuard],
  },
  {
    path: 'add-user',
    component: EditUserComponent,
    canActivate: [CanLoadGuard],
  },
  {
    path: 'details/:id',
    component: UserDetailsComponent,
    canActivate: [CanLoadGuard],
  },
  {
    path: 'edit-user/:id',
    component: EditUserComponent,
    canActivate: [CanLoadGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
