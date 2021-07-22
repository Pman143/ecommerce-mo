import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../services/product.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm: FormGroup;
  fullNameRequiredMessage = 'Full name is required.';
  descriptionRequiredMessage = 'Description number is required.';
  imageUrlRequiredMessage = 'Image url is required.';
  isSubmitted = false;
  productId: string;
  addedProduct = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private snackBar: MatSnackBar) {
    this.productId = (Math.floor(Math.random() * 1000) + 1).toString();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.productForm = this.fb.group({
      productId: new FormControl(this.productId, Validators.required),
      productName: new FormControl('', Validators.required),
      productPrice: new FormControl('', [Validators.required]),
      productDescription: new FormControl('', Validators.required),
      productImageUrl: new FormControl('', Validators.required),
      isInCart: new FormControl(false, Validators.required),
    });
  }

  onSubmitForm(form: FormGroup) {
    if (form.invalid) {
      return;
    }
    this.isSubmitted = true;
    this.productService.addProduct(form.value).subscribe(response => {
      if (response.hasOwnProperty('name')) {
        this.addedProduct = true;
        this.snackBar.open('Added Product Successfully');
        this.router.navigate(['']);
        this.productForm.reset();
        this.productForm.clearValidators();
      }
      this.isSubmitted = false;
    });
  }
}
