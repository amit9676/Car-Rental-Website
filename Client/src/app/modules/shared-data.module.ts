import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CarConditionsPipe } from '../pipes/car-conditions.pipe';
import { NullValPipe } from '../pipes/null-val.pipe';
import { EditPictureComponent } from '../components/edit-picture/edit-picture.component';
import { FormsModule } from '@angular/forms';
import { OrdersManagerComponent } from '../components/orders-manager/orders-manager.component';
import { OrderDetailsComponent } from '../components/order-details/order-details.component';

@NgModule({
  declarations: [CarConditionsPipe, NullValPipe, EditPictureComponent, OrdersManagerComponent, OrderDetailsComponent],
  imports: [
    CommonModule, FormsModule
  ],
  exports: [CarConditionsPipe, NullValPipe, FormsModule, EditPictureComponent, OrdersManagerComponent, OrderDetailsComponent]
})
export class SharedDataModule { }
