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

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "profile", component: ProfileComponent },
  { path: "profile/:uid", component: ProfileComponent },
  { path: "search", component: SearchComponent },
  { path: "detail", component: DetailComponent },
  { path: "productmap", component: ProductMapComponent },
  { path: "publish", component: EditProductComponent },
  { path: "edit/:pid", component: EditProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
