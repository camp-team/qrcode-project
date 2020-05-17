import { StoreService } from './../services/store.service';
import { Store } from './../interfaces/store';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idToStore',
})
export class IdToStorePipe implements PipeTransform {
  constructor(private storeService: StoreService) {}

  transform(ids: string[]): Store[] {
    return ids.map((id) =>
      this.storeService.realStore.find((store) => store.id === id)
    );
  }
}
