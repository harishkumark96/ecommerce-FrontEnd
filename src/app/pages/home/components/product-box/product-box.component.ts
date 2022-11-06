import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.css']
})
export class ProductBoxComponent implements OnInit {
@Input() fullWidthMode :boolean = false;
@Output() addToCart = new EventEmitter();
@Input()
product: Product | undefined
//  ={
//   id:1,
//   title:'Snickers',
//   price:150,
//   category:'shoes',
//   description:'Description',
//   image: 'https://material.angular.io/assets/img/examples/shiba2.jpg'
// }
  constructor() { }

  ngOnInit(): void {
  }
  onAddToCart():void {
    this.addToCart.emit(this.product)
   }
}
