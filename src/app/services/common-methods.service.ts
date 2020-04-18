import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonMethodsService {

  constructor() { }
  delete(id: number, collection: any[]) {
    if (collection === undefined) {
      console.log('Cant delete the collection is undefined');
      return;
    }
    const index = this.getIndex(id, collection);
    if (index === undefined) {
      console.log('Cant delete cant find id' + id);
      return;
    }
    collection.splice(index, 1);
  }
  getNextId(collection: any[]) {
    if (collection === undefined || collection.length === 0) {
      return 1;
    }
    const postIds: number[] = collection.map(singleItem => singleItem.id);
    const highest = postIds.sort((a, b) => b - a);
    return highest[0] + 1 ;
  }
  private getIndex(id: number, collection: any[]) {
    const index = collection.findIndex(singleUser => singleUser.id === id);
    return index;
  }
  backToFullUserPage(router: Router, userId: number) {
    router.navigate([{outlets: {primary: 'home',
    mainpage1: ['todos', {id: userId}],
    mainpage2: ['posts', {id: userId}]}}]);
  }
  backToPartialUserPage(router: Router) {
    router.navigate(['/']);
  }
}
