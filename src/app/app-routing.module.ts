import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductComponent} from './product/product.component';
import {AddProductComponent} from './product/add-product/add-product.component';
import {EditProductComponent} from './product/edit-product/edit-product.component';
import {ProductListComponent} from './product/product-list/product-list.component';
import {ShoppingCartComponent} from './product/shopping-cart/shopping-cart.component';

const appRoutes: Routes = [
  {path: '', component: ProductListComponent, pathMatch: 'full'},
  {path: 'shopping-cart', component: ShoppingCartComponent},
  {
    path: 'product', component: ProductComponent, children: [
      {path: '', component: ProductListComponent},
      {path: 'new', component: AddProductComponent},
      {path: ':key', component: EditProductComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
