import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { DetailComponent } from './detail/detail.component';
import { RegisterComponent } from './register/register.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { ProductGridComponent } from './product-grid/product-grid.component';
import { ProductMapComponent } from './product-map/product-map.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import {FormsModule} from "@angular/forms";
import {UserService} from "../services/user.service";
import { EditProductComponent } from './edit-product/edit-product.component';
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    SearchComponent,
    DetailComponent,
    RegisterComponent,
    ProductTableComponent,
    ProductGridComponent,
    ProductMapComponent,
    PrivacyPolicyComponent,
    EditProductComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
