import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { CarReturnComponent } from './components/car-return/car-return.component';
import { OrdersManagerComponent } from './components/orders-manager/orders-manager.component';
import { UserManagerComponent } from './components/user-manager/user-manager.component';
import { SignUpComponent } from './components/signing-folder/sign-up/sign-up.component';
import { SignInComponent } from './components/signing-folder/sign-in/sign-in.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { SharedDataModule } from './modules/shared-data.module';
import { EditPictureComponent } from './components/edit-picture/edit-picture.component';

const routes: Routes = [
  { path: "main", component: MainComponent },
  { path: "cars", loadChildren: "./modules/cars.module#CarsModule" },
  { path: "rent-car/:id", loadChildren: "./modules/car-rent.module#CarRentModule"},
  { path: "car-manager", loadChildren: "./modules/car-manager.module#CarManagerModule" },
  { path: "personal-zone", loadChildren: "./modules/personal-zone.module#PersonalZoneModule" },
  { path: "contact-us", component: ContactUsComponent},
  { path: "car-return", component: CarReturnComponent},
  { path: "orders-manager", component: OrdersManagerComponent},
  { path: "orders-manager/order-details/:id", component: OrderDetailsComponent},
  { path: "order-details/:id", component: OrderDetailsComponent},
  { path: "user-manager", component: UserManagerComponent},
  { path: "user-manager/edit-user-picture/:id", component: EditPictureComponent},
  { path: "sign-up", component: SignUpComponent},
  { path: "sign-in", component: SignInComponent},
  { path: '', pathMatch: 'full', redirectTo: '/main'},
  {path: '**', pathMatch: 'full', redirectTo: '/main' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)/*, SharedDataModule*/],
  exports: [RouterModule]
})
export class AppRoutingModule { }
