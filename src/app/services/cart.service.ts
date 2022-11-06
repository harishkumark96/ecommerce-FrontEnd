import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem} from '../models/cart.model'

@Injectable({
  providedIn: 'root'
})
export class CartService {
cart = new BehaviorSubject<Cart>({items:[]});
  constructor(private _snackBar:MatSnackBar) { }

addToCart(item:CartItem):void {
const items =[...this.cart.value.items];
const itemInCart = items.find((e) =>{
 return  e.id === item.id
})
if(itemInCart){
  itemInCart.quantity +=1
}else{
  items.push(item)
}
this.cart.next({items})
this._snackBar.open('1 item has been added to cart','ok',{duration:3000})
console.log(this.cart.value)
  }

  getTotal(items: Array<CartItem>):number{
    return items.map(e=>{
     return  e.price * e. quantity
    }).reduce((pre,cur)=>{
      return pre+cur
    },0)
  }
  clearCart(){
    this.cart.next({items:[]})
    this._snackBar.open('cart is cleared','ok',{
      duration: 3000
    })
  }
  removeFromCart(item: CartItem,update =true){
    const filterdItems = this.cart.value.items.filter((e)=>{
      e.id !== item.id
    })
   if(update){
    this.cart.next({items:filterdItems});
    this._snackBar.open('1 item removed from cart ', 'ok',{
      duration:3000
    })
   }
   return filterdItems
  }

  removeQuantity(item:CartItem):void {
    let removeData!: CartItem ;
     let filteredItems=   this.cart.value.items.map(e =>{
              if(e.id === item.id) {
                e.quantity--;
                if(e.quantity === 0) {
                  removeData = e
                }
              }
              return e
             }
             );
             if(removeData) {
              filteredItems = this.removeFromCart(removeData,false);
             }
  this.cart.next({items: filteredItems});
  this._snackBar.open('1item has been removed from cart','ok',{
    duration:3000
  })

  }


}
