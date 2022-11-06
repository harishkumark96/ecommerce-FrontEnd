import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
cart: Cart = {items :[]};
 dataSource : Array<CartItem> = [];
 displayColumns: Array<string> =[
  'product',
  'name',
  'price',
  'quantity',
  'total',
  'action'
 ]
  constructor(private cartService: CartService, private http:HttpClient) { }

  ngOnInit(): void {
    // this.dataSource = this.cart.items
    this.cartService.cart.subscribe(data =>{
      this.cart =data;
      this.dataSource = this.cart.items

    })
  }
  getTotal(items: Array<CartItem>):number{
     return this.cartService.getTotal(items)
  }
  onClearCart(){
    return this.cartService.clearCart();
  }
  onRemoveCart(item:CartItem):void{
   this.cartService.removeFromCart(item);
  }
  onAddQuantity(element:CartItem){
    this.cartService.addToCart(element)
  }
  onRemoveQunatity(element: CartItem){
    this.cartService.removeQuantity(element)
}
onCheckOut():void{
  console.log('on check out')
this.http.post('https://ecommerce-server16.herokuapp.com/checkout',{
  items: this.cart.items
}).subscribe( async (data:any)=>{
  let stripe = await loadStripe('pk_test_51LwU2OSDLSlS9nrQHjNSSYqV0CrFMpxWiiIVDxEdrlsbqCsde0aKhRCMt44SVJJSmRB87LK2wEjCjvM2tpsHmqah00sOncjKh3');
  stripe?.redirectToCheckout({
    sessionId: data.id,
  });
})
}
}
