import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
//import { AgmCoreModule} from "@agm/core"

import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/website-layout/layout/layout.component';
import { HeaderComponent } from './components/website-layout/header/header.component';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './components/website-layout/footer/footer.component';
import { CarsModule } from './modules/cars.module';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { CarRentModule } from './modules/car-rent.module';
import { BranchComponent } from './components/branch/branch.component';
import { CarReturnComponent } from './components/car-return/car-return.component';
//import { OrdersManagerComponent } from './components/orders-manager/orders-manager.component';
import { UserManagerComponent } from './components/user-manager/user-manager.component';
import { CarManagerModule } from './modules/car-manager.module';
import { SignUpComponent } from './components/signing-folder/sign-up/sign-up.component';
import { SignInComponent } from './components/signing-folder/sign-in/sign-in.component';
import { PersonalZoneModule } from './modules/personal-zone.module';
//import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { SharedDataModule } from './modules/shared-data.module';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    ContactUsComponent,
    BranchComponent,
    CarReturnComponent,
    //OrdersManagerComponent,
    UserManagerComponent,
    SignUpComponent,
    SignInComponent,
    //OrderDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CarsModule,
    CarRentModule,
    CarManagerModule,
    SharedDataModule,
    PersonalZoneModule
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
