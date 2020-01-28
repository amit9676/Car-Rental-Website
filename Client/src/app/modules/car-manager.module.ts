import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CarManageLayoutComponent } from '../components/car-management-folder/car-manage-layout/car-manage-layout.component';
import { CarsManagerComponent } from '../components/car-management-folder/cars-manager/cars-manager.component';
import { ManufactorsManagerComponent } from '../components/car-management-folder/manufactors-manager/manufactors-manager.component';
import { FormsModule } from '@angular/forms';
import { SharedDataModule } from './shared-data.module';
import { AddCarComponent } from '../components/car-management-folder/add-car/add-car.component';
import { AddManufactorComponent } from '../components/car-management-folder/add-manufactor/add-manufactor.component';
import { ModelsManagerComponent } from '../components/car-management-folder/models-manager/models-manager.component';
import { AddModelComponent } from '../components/car-management-folder/add-model/add-model.component';
import { DesignsManagerComponent } from '../components/car-management-folder/designs-manager/designs-manager.component';
import { AddDesignComponent } from '../components/car-management-folder/add-design/add-design.component';
import { EditPictureComponent } from '../components/edit-picture/edit-picture.component';


const routes: Routes = [
  { 
    path: "", component: CarManageLayoutComponent, children:
    [
      {path: "manage-cars/cars-table", component: CarsManagerComponent},
      {path: "manage-manufactors/manufactors-table", component: ManufactorsManagerComponent},
      {path: "manage-models/models-table", component: ModelsManagerComponent},
      {path: "manage-designs/designs-table", component: DesignsManagerComponent},
      {path: "manage-cars/add-car", component: AddCarComponent},
      {path: "manage-manufactors/add-manufactor", component: AddManufactorComponent},
      {path: "manage-models/add-model", component: AddModelComponent},
      {path: "manage-designs/add-design", component: AddDesignComponent},
      {path: "manage-cars/edit-car-picture/:id", component: EditPictureComponent},
      {path: '', pathMatch: 'full', redirectTo: 'manage-cars/cars-table'},
      {path: "manage-manufactors", redirectTo: "manage-manufactors/manufactors-table" },
      {path: "manage-cars", redirectTo: "manage-cars/cars-table" },
      {path: "manage-models", redirectTo: "manage-models/models-table" },
      {path: "manage-designs", redirectTo: "manage-designs/designs-table" },/*,
      {path: '**', pathMatch: 'full', redirectTo: 'manage-cars/cars-table'}*/
    ]
  }
]

@NgModule({
  declarations: [CarManageLayoutComponent, CarsManagerComponent, ManufactorsManagerComponent, AddCarComponent, AddManufactorComponent, ModelsManagerComponent, AddModelComponent, DesignsManagerComponent, AddDesignComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes), FormsModule, SharedDataModule
  ]
})
export class CarManagerModule { }
