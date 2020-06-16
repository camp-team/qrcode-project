import { Pipe, PipeTransform } from '@angular/core';
import { StoreService } from '../services/store.service';
import { Store } from '../interfaces/store';

@Pipe({
  name: 'idToStore',
})
export class IdToStorePipe implements PipeTransform {
  constructor(private storeService: StoreService) {}

  transform(
    ids: string[],
    type: 'real' | 'online' | 'invoice'
  ): { title: string; id: string; items: Store[] }[] {
    const stores = ids.map((id) => {
      return this.storeService.store.find((store) => store.id === id);
    });
    const categorisedStores = this.storeService.categories.map((category) => {
      console.log(category);
      return {
        title: category.title,
        id: category.id,
        items: stores.map((store) => {
          return category.items.find((item) => item.id === store.id);
        }),
      };
    });
    console.log(categorisedStores);
    return categorisedStores;
    // return stores.filter((store) => store.type === type);
  }
}
