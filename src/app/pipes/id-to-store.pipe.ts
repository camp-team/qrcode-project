import { Pipe, PipeTransform } from '@angular/core';
import { StoreService } from '../services/store.service';
import { Store } from '../interfaces/store';

@Pipe({
  name: 'idToStore',
})
export class IdToStorePipe implements PipeTransform {
  constructor(private storeService: StoreService) {}

  transform(ids: string[], type: 'real' | 'online' | 'invoice'): Store[] {
    const stores = ids.map((id) => {
      return this.storeService.store.find((store) => store.id === id);
    });

    return stores.filter((store) => store.type === type);
  }
}
