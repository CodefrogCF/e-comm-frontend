import { Routes } from '@angular/router';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { CartComponent } from './pages/cart/cart.component';
import { HomeComponent } from './pages/home/home.component';
import { OrderConfirmationComponent } from './pages/order-confirmation/order-confirmation.component';

export const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
},
{
    path: 'products',
    component: ProductsListComponent,
},
{
    path: 'cart',
    component: CartComponent,
},
{
    path: 'order-confirmation',
    component: OrderConfirmationComponent,
}];
