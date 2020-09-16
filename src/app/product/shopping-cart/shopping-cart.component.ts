import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../interface/product';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  productsInCart: Product[] = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.cart$.subscribe((res) => {
      console.log(res);
      this.productsInCart = res;
    });
  }

  onRemoveProductFromCart(product: Product) {
    this.productService.removeProductFromCart(product).subscribe((res) => {
      console.log(res);
      this.productService.openSnackBar('Product removed successfully.', '');
    });
  }
}
