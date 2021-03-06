import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './user.component';
import { UsersService } from './user.service';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserItemComponent } from './user-list/user-item/user-item.component';
import { UsersDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserRoutingModule } from './user.routing';
import { UserNotFoundComponent } from './user-notfound/user.notfound.component';
import { UserRoleNamePipe } from './user.model';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    UserRoutingModule   // Order is important, MUST be BEFORE AppRoutingModule!
    // AppRoutingModule  // NO import of AppRoutingModule - would overwrite previous routes!
  ],
  declarations: [
    UsersComponent,
    UserListComponent,
    UserDetailComponent,
    UserProfileComponent,
    UserEditComponent,
    UserItemComponent,
    UserNotFoundComponent,
    UserRoleNamePipe,
    UsersDashboardComponent
  ],
  exports: [
    UsersComponent
  ]
})
export class UsersModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UsersModule,
      providers: [UsersService]
    };
  }
}
