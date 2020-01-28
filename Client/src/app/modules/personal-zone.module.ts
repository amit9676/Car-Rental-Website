import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PeronsalZoneLayoutComponent } from '../components/personal-zone-folder/peronsal-zone-layout/peronsal-zone-layout.component';
import { UserDetailsComponent } from '../components/personal-zone-folder/user-details/user-details.component';
import { ChangePasswordComponent } from '../components/personal-zone-folder/change-password/change-password.component';
import { FormsModule } from '@angular/forms';
import { OrderDetailsComponent } from '../components/order-details/order-details.component';
import { SharedDataModule } from './shared-data.module';
import { OrdersManagerComponent } from '../components/orders-manager/orders-manager.component';
import { EditPictureComponent } from '../components/edit-picture/edit-picture.component';

const routes: Routes = [
  { path: "", component: PeronsalZoneLayoutComponent, children: 
    [
      {path: "user-details", component: UserDetailsComponent},
      {path: "change-password", component: ChangePasswordComponent},
      {path: "change-my-picture", component: EditPictureComponent},
      {path: "personal-orders", component: OrdersManagerComponent},
      {path: "personal-orders/order-details/:id", component: OrderDetailsComponent},
      {path: '', pathMatch: 'full', redirectTo: '/personal-zone/user-details'},
      {path: '**', pathMatch: 'full', redirectTo: '/personal-zone/user-details' }
    ]
  }

]

@NgModule({
  declarations: [PeronsalZoneLayoutComponent, UserDetailsComponent, ChangePasswordComponent],
  imports: [
    CommonModule, FormsModule, SharedDataModule, RouterModule.forChild(routes)
  ]
})
export class PersonalZoneModule { }
