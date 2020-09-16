import {Component} from '@angular/core';
import {ProductService} from './services/product.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'e-commerce';
  cartCount = 0;

  constructor(private productService: ProductService, private router: Router) {
    this.productService.fetchProductsFromFirebase().subscribe();
    this.productService.retrieveFromCart().subscribe();
    this.productService.cart$.subscribe(res => {
      console.log('My Products ',  res);
      this.cartCount = res.length;
    });
  }

  onAddProduct() {
    this.router.navigate(['product/new']);
  }

  onNavigateHome() {
    this.router.navigate(['']);
  }

  onShoppingCart() {
    this.router.navigate(['shopping-cart']);
  }
}
