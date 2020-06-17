import { Pipe, PipeTransform } from '@angular/core';
import { StoreService } from '../services/store.service';
import { Store } from '../interfaces/store';
import { StoreCategory } from '../interfaces/store-category';

@Pipe({
  name: 'idToStore',
})
export class IdToStorePipe implements PipeTransform {
  constructor(private storeService: StoreService) {}

  transform(
    ids: string[],
    type: 'real' | 'online' | 'invoice'
  ): StoreCategory[] {
    const stores = ids.map((id) => {
      return this.storeService.store.find((store) => store.id === id);
    });
    const storeCategories = this.storeService.categories.map((category) => {
      return {
        title: category.title,
        id: category.id,
        type: category.type,
        items: stores.filter((store) => {
          return category.items.find((item) => item.id === store.id);
        }),
      };
    });
    console.log(storeCategories);
    return storeCategories.filter((category) => category.type === type);
  }
}
