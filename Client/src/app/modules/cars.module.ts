import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CarSearchComponent } from '../components/car-search-folder/car-search/car-search.component';
import { CarSearchLayoutComponent } from '../components/car-search-folder/car-search-layout/car-search-layout.component';
import { YourCarsComponent } from '../components/car-search-folder/your-cars/your-cars.component';
import { CarComponent } from '../components/car/car.component';
import { ResultsAmountPipe } from '../pipes/results-amount.pipe';
import { CarRentModule } from './car-rent.module';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: "", component: CarSearchLayoutComponent, children: 
    [
      {path: "carSearch", component: CarSearchComponent},
      {path: "yourCars", component: YourCarsComponent},
      {path: '', pathMatch: 'full', redirectTo: '/cars/carSearch'},
      {path: '**', pathMatch: 'full', redirectTo: '/cars/carSearch' }
    ]
  }

]

@NgModule({
  declarations: [CarSearchComponent, CarSearchLayoutComponent, YourCarsComponent, 
    CarComponent, ResultsAmountPipe],
  imports: [
    CommonModule, RouterModule.forChild(routes), FormsModule
  ]
})
export class CarsModule { }
