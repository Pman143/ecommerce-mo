import {Injectable} from '@angular/core';
import {Product} from '../interface/product';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

const FIREBASE_URL = 'https://e-commerce-app-mo.firebaseio.com/product.json';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  private cartSubject = new BehaviorSubject<Product[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
  }

  saveCartProducts(res: Product[]) {
    console.log(res);
    if (res) {
      this.cartSubject.next(res);
      console.warn(res);
    } else {
      console.log('Nothing ', this.cartSubject.getValue());
    }
  }

  addProduct(product: Product) {
    return this.http.post(FIREBASE_URL, product).pipe(tap(res => {
      //  this.productsSubject.next();
    }));
  }

  fetchProductsFromFirebase() {
    return this.http.get<{ [key: string]: Product }>(FIREBASE_URL).pipe(map(resData => {
      const prod: Product[] = [];
      for (const key in resData) {
        if (resData.hasOwnProperty(key)) {
          prod.push({
            productKey: key,
            productId: resData[key].productId,
            productName: resData[key].productName,
            productPrice: resData[key].productPrice,
            productImageUrl: resData[key].productImageUrl,
            productDescription: resData[key].productDescription,
            isInCart: resData[key].isInCart ? true : false
          });
        }
      }
      return prod;
    }), tap(res => {
      this.productsSubject.next(res);
    }));
  }

  fetchProductById(productKey: string) {
    console.log(productKey);
    // return this.productsSubject.getValue().slice().find(product => product.productId === productId);
    return this.http.get<{ [key: string]: Product }>(`https://e-commerce-app-mo.firebaseio.com/product/${productKey}.json`)
      .pipe(map(resData => {
        return resData;
      }), tap());
  }

  addProductToCart(product: Product) {
    return this.http.patch(`https://e-commerce-app-mo.firebaseio.com/product/${product.productKey}.json`, {isInCart: true}).pipe(
      tap(res => {
        this.retrieveFromCart().subscribe();
      })
    );
  }

  removeProductFromCart(product: Product) {
    return this.http.patch(`https://e-commerce-app-mo.firebaseio.com/product/${product.productKey}.json`, {isInCart: false}).pipe(
      tap(res => {
        this.retrieveFromCart().subscribe();
      })
    );
  }

  retrieveFromCart() {
    return this.http.get<{ [key: string]: Product }>(FIREBASE_URL).pipe(map(resData => {
      const prod: Product[] = [];
      for (const key in resData) {
        if (resData.hasOwnProperty(key)) {
          if (resData[key].isInCart === true) {
            prod.push({
              productKey: key,
              productId: resData[key].productId,
              productName: resData[key].productName,
              productPrice: resData[key].productPrice,
              productImageUrl: resData[key].productImageUrl,
              productDescription: resData[key].productDescription,
              isInCart: resData[key].isInCart
            });
          }
        }
      }
      return prod;
    }), tap(res => {
      if (res) {
        this.saveCartProducts(res);
      }
    }));
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
