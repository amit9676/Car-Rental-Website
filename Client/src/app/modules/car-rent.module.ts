import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CarRentLayoutComponent } from '../components/rent-folder/car-rent-layout/car-rent-layout.component';
import { CarDetailsComponent } from '../components/rent-folder/car-details/car-details.component';
import { RentDetailsComponent } from '../components/rent-folder/rent-details/rent-details.component';
import { SharedDataModule } from './shared-data.module';
import { BranchPickupComponent } from '../components/rent-folder/branch-pickup/branch-pickup.component';

const routes: Routes = [
  { path: "", component: CarRentLayoutComponent, children: 
    [
      {path: "details", component: CarDetailsComponent},
      {path: "rent-details", component: RentDetailsComponent},
      {path: "branch-pickup", component: BranchPickupComponent},
      {path: '**', pathMatch: 'full', redirectTo: 'details'}
    ]
  }

]

@NgModule({
  declarations: [CarRentLayoutComponent, CarDetailsComponent, RentDetailsComponent, BranchPickupComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes), SharedDataModule
  ]
})
export class CarRentModule { }
