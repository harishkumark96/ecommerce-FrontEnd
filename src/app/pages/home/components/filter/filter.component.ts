import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit, OnDestroy {
  @Output() showCategory = new EventEmitter();
 categoriesSubscription: Subscription | undefined;
  categories : Array<string> | undefined;
  constructor(private store: StoreService) { }

  ngOnInit(): void {
   this.categoriesSubscription = this.store.getAllCategories().subscribe(data =>{
       this.categories = data;
    })
  }
  onShowCategory(val:string):void {
    console.log(val)
   this.showCategory.emit(val)
  }
  ngOnDestroy(){
    if(this.categoriesSubscription){
      this.categoriesSubscription.unsubscribe()
    }
  }
}
