import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {Product} from '../../interface/product';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productKey: any;
  displayedProduct: Product;

  constructor(private route: ActivatedRoute, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productKey = this.route.snapshot.paramMap.get('key').toString();
    this.productService.fetchProductById(this.productKey).subscribe((res: any) => {
      console.log(res);
      this.displayedProduct = res;
    });
  }

}
