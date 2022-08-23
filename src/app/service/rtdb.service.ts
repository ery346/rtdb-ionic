import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RtdbService {
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  constructor(db: AngularFireDatabase) {
    this.itemsRef = db.list('messages');
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().pipe(
      map((changes:any) => 
        changes.map((c:any) => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }
  addItem(newName: string) {
    this.itemsRef.push({ text: newName });
  }
  updateItem(key: string, newText: string) {
    this.itemsRef.update(key, { text: newText });
  }
  deleteItem(key: string) {
    this.itemsRef.remove(key);
  }
  deleteEverything() {
    this.itemsRef.remove();
  }
}
