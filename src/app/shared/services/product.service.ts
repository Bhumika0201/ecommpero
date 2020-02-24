import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { ToastrServic } from "./toastr.service";
import { Product } from "../models/product";
import { FileUploader } from "ng2-file-upload";

@Injectable()
export class ProductService {
 uri = " https://frozen-thicket-03463.herokuapp.com/api/";
 // uri = " http://localhost:5000/api/";

  // NavbarCounts
  navbarCartCount = 0;
  postorder: Product[];
  responseDelivery =[];

  categoryList: any;
  constructor(
    private http: HttpClient,

    private toastrService: ToastrServic
  ) {}
  getCategories() {
    console.log("in get categories");

    return this.http.get(`${this.uri}/findCategories`);
  }
  getTxrate() {
    console.log("in get taxrates");

    return this.http.get(`${this.uri}/getTax`);
  }
  createCategory(data) {
    console.log("in create category");
    console.log(data);
    this.http
      .post(`${this.uri}/addcategories`, data)
      .subscribe(res => console.log("Done"));
  }
  AddProductsData(productInfo: Product) {
    console.log(productInfo);
    const obj = {
      productName: productInfo.productName,
      productCategory: productInfo.productCategory
    };
    this.http
      .post(`${this.uri}products/addProduct`, productInfo)
      .subscribe(res => console.log("Done"));
  }
  getProducts() {
    console.log("in get products");

    return this.http.get(`${this.uri}products/productlist`);
    // return this.http.get(`http://localhost:5000/api/fbusers/login/facebook`);
  }
  getProductsCategoryWise(productCategory) {
    console.log("in get products category wise");
    console.log(productCategory);
    return this.http.post(`${this.uri}products/productlistcategorywise`, {
      productCategory: productCategory
    });
    // return this.http.get(`http://localhost:5000/api/fbusers/login/facebook`);
  }
  searchProduct(searchTerm) {
    console.log("in search Product");
    console.log(searchTerm);
    return this.http.post(`${this.uri}products/searchTerms`, {
      searchTerm: searchTerm
    });
    // return this.http.get(`http://localhost:5000/api/fbusers/login/facebook`);
  }



  getProductDetails(id: string) {
    console.log("in get products");

    return this.http.get(`${this.uri}products/productDetail/${id}`);
  }

  // Adding new Product to cart db if logged in else localStorage
  addToCart(data: Product): void {
    let a: Product[];

    a = JSON.parse(localStorage.getItem("avct_item")) || [];

    a.push(data);
    this.toastrService.wait(
      "Adding Product to Cart",
      "Product Adding to the cart"
    );
    console.log(JSON.stringify(a));
    setTimeout(() => {
      localStorage.setItem("avct_item", JSON.stringify(a));
      this.calculateLocalCartProdCounts();
    }, 500);
  }

  // Removing cart from local
  removeLocalCartProduct(product: Product) {
    const products: Product[] = JSON.parse(localStorage.getItem("avct_item"));

    for (let i = 0; i < products.length; i++) {
      if (products[i].productId === product.productId) {
        products.splice(i, 1);
        break;
      }
    }
    // ReAdding the products after remove
    localStorage.setItem("avct_item", JSON.stringify(products));

    this.calculateLocalCartProdCounts();
  }
  // Removing cart from local
  emptyCart() {
    const products: Product[] = JSON.parse(localStorage.getItem("avct_item"));
    this.addtopostorder();

    // ReAdding the products after remove
  }

  addtopostorder() {
    this.postorder = JSON.parse(localStorage.getItem("avct_item"));
    //localStorage.removeItem('avct_item');
    console.log(this.postorder);
    this.calculateLocalCartProdCounts();
    return this.postorder;

  }

  // Fetching Locat CartsProducts
  getLocalCartProducts(): Product[] {
    const products: Product[] =
      JSON.parse(localStorage.getItem("avct_item")) || [];

    return products;
  }

  // returning LocalCarts Product Count
  calculateLocalCartProdCounts() {
    this.navbarCartCount = this.getLocalCartProducts().length;
  }

  AddAddress(address) {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    console.log("user is", user._id || user.id);

    const products = this.addtopostorder();
    const obj = {
      user: user._id || user.id,
      products: this.addtopostorder(),
      address: address
    };
    console.log("obj", obj);
    return this.http.post(`${this.uri}products/addDeliveryInfo`, obj)
    .subscribe(res => console.log(res));

  }
}
