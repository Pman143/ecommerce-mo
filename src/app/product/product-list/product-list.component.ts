import {Component, OnInit} from '@angular/core';
import {Product} from '../../interface/product';
import {ProductService} from '../../services/product.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.productService.products$.subscribe((res: Product[]) => {
      this.products = res;
    });
  }

  onViewProduct(product: Product) {
    this.router.navigate(['product/', product.productKey]);
  }

  onAddToCart(product: Product) {
    this.productService.addProductToCart(product).subscribe(res => {
      console.log(res);
      this.productService.openSnackBar('Added product successfully to cart', '');
    });
  }

}
