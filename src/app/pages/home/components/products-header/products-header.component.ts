import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
  styleUrls: ['./products-header.component.css']
})
export class ProductsHeaderComponent implements OnInit {
  @Output() columnCountChange = new EventEmitter<number>();
  @Output() itemsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();

sort: string= 'desc';
itemsShowCount : number= 12;

  constructor() { }

  ngOnInit(): void {
  }

  onSortUpdated(data: string): void {
 this.sort = data;
//  console.log(data)
this.sortChange.emit(data)
  }

  onItemsUpdated(data:number):void{
   this.itemsShowCount = data;
   this.itemsCountChange.emit(data)
  }

  onColomnUpdated(col:number):void{
  this.columnCountChange.emit(col);
  }

}
