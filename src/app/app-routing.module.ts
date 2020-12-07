import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {ProfileComponent} from "./profile/profile.component";
import {SearchComponent} from "./search/search.component";
import {DetailComponent} from "./detail/detail.component";
import {RegisterComponent} from "./register/register.component";
import {ProductMapComponent} from "./product-map/product-map.component";
import {EditProductComponent} from "./edit-product/edit-product.component";
import {EditProfileComponent} from './edit-profile/edit-profile.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "profile", component: ProfileComponent },
  { path: "profile/:uid", component: ProfileComponent },
  { path: "edit_profile/:uid", component: EditProfileComponent },
  { path: "search", component: SearchComponent },
  { path: "product/:pid", component: DetailComponent },
  { path: "detail/:pid", component: DetailComponent },
  { path: "productmap", component: ProductMapComponent },
  { path: "publish", component: EditProductComponent },
  { path: "edit/:pid", component: EditProductComponent },
  { path: "search/:searchField", component: SearchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
