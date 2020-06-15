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
    const categorisedStore = stores.map((store) => {
      return this.storeService.categories.find((category) => {
        return category.items.find((item) => item.id === store.id);
      });
    });
    console.log(stores);
    console.log(categorisedStore);
    return categorisedStore;
    // return stores.filter((store) => store.type === type);
  }
}
