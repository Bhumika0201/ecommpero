import { Component, OnInit ,ViewChild} from "@angular/core";
import { ModalDirective } from 'node_modules/angular-bootstrap-md/lib/free/modals/modal.directive';



import { NgForm } from "@angular/forms";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl
} from "@angular/forms";
import { ProductService } from "../../../shared/services/product.service";

import { Product } from "src/app/shared/models/product";
import { Categories } from "../../../shared/models/categories";
import { Taxconversion } from "../../../shared/models/taxconversion";
import { FileUploader } from 'ng2-file-upload';
import { DomSanitizer } from "@angular/platform-browser";
import { ToastrServic } from "../../../shared/services/toastr.service";
import { Router, ActivatedRoute } from "@angular/router";


import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
declare var $: any;
declare var require: any;
declare var toastr: any;
const moment = require("moment");

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.scss"]
})

export class AddProductComponent implements OnInit {
  @ViewChild('AddCategory',{static: false}) public AddCategory : ModalDirective;
  @ViewChild('AddSubCategory',{static: false}) public AddSubCategory : ModalDirective;




  //public uploader:FileUploader = new FileUploader({url:'http://localhost:5000/api/uploadPhoto'});
  public uploader: FileUploader = new FileUploader({
   //url: "http://localhost:5000/api/upload",
   url: "http://localhost:5000/api/products/uploadPhoto",
    method: "POST",
    itemAlias: "uploadedfile"
  });
  taxconversion: Taxconversion[];

  categories: Categories[];
  constructor(
    private PService: ProductService,
    private formBuilder: FormBuilder,
    public sanitizer: DomSanitizer,
    public toastService:ToastrServic,
    private router: Router,

  ) {}
  product: Product = new Product();

  taxRateList = [];
  imgURLs = [];
  ShowImageupload: boolean = false;
  ShowDetailForm: boolean = true;

  message;
  public imagePath;
  imgURL: any;
  category = new FormGroup({
    categoryname: new FormControl(),
    categoryparent: new FormControl(),
    categorysort: new FormControl()
  });

  AddCategoryName(categoryName) {
    console.log(categoryName);

    this.category.value.categoryname = categoryName;
    this.category.value.categoryparent = "";
    this.category.value.categorysort = categoryName;
    this.PService.createCategory(this.category.value);

   this.AddCategory.hide();
    this.toastService.success( categoryName ,'is added successfully');


  }
  AddSubCategoryName(subcategoryName, categoryname) {
    this.category.value.categoryname = subcategoryName;
    this.category.value.categoryparent = categoryname;
    this.category.value.categorysort = categoryname + ":" + subcategoryName;

    this.PService.createCategory(this.category.value);
    this.toastService.success( subcategoryName ,'is added successfully');
    this.AddSubCategory.hide();
  }
  ImageUrls = [];
  ngOnInit() {
    this.PService.getCategories().subscribe((data: Categories[]) => {
      this.categories = data;
    });
    this.PService.getTxrate().subscribe((data: Taxconversion[]) => {
      //  console.log(data)
      this.taxconversion = data;
    });
    console.log(this.taxconversion);
    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
      let url = window.URL
        ? window.URL.createObjectURL(file._file)
        : (window as any).webkitURL.createObjectURL(file._file);
      console.log(url);
      this.ImageUrls.push(url);
    };
    this.uploader.onCompleteItem = (
      item: any,
      response: any,
      status: any,
      headers: any
    ) => {
      console.log("ImageUpload:uploaded:", item, status, response);
      alert("File uploaded successfully");
      this.toastService.success( 'Product' ,'is added successfully');
      this.router.navigate(['/products/all-products']);
    };


  }



    // observe percentage changes
    //this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    /* task
      .snapshotChanges()
      .pipe(finalize(() => (this.downloadURL = fileRef.getDownloadURL())))
      .subscribe();*/ 

  AddProduct(addProductForm: NgForm) {
    //console.log(addProductForm.value);


    this.PService.AddProductsData
    (addProductForm.value);
    this.ShowDetailForm=false;
    this.ShowImageupload=true;



  }
}
