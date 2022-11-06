import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';
import {CartItem} from '../../models/cart.model'

const Rows_height:any ={ 1:400,3:335,4:350}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
cols =3;
rowHeight = Rows_height[this.cols];
category: string | undefined;
products:Product[] | undefined;
sort ="desc";
count ='12';
productSubscription: Subscription | undefined
  constructor(private cartService: CartService, private storeService: StoreService) { }

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(){
    this.productSubscription = this.storeService.getAllProducts(this.count,this.sort,this.category)
    .subscribe(data=>{
      this.products = data
    })

  }

  onItemsCountChange(count:number){
      this.count =  count.toString();
      this.getProducts();
    }
    onSortChange(data:string){
     this.sort = data;
     this.getProducts();
    }

  onColumnCountChange(val: number): void {
    this.cols = val;
    this.rowHeight = Rows_height[this.cols]
    console.log(this.rowHeight)
  }
  onShowCategory(category:string):void {
    this.category = category;
    this.getProducts();
  }
  ondAddToCart(product: Product):void{
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id
    })
   }
   ngOnDestroy(){
    if(this.productSubscription){
      this.productSubscription.unsubscribe();
    }
   }
}
