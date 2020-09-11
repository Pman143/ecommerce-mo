export interface Product {
  productKey;
  productId: string;
  productName: string;
  productPrice: number;
  productDescription: string;
  productImageUrl: string;
  isInCart?: boolean;
}
