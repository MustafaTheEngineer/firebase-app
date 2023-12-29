import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { Kategori } from '../classes/kategori';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent  implements OnInit {

  constructor(private firestore: AngularFirestore) { }

  ngOnInit() {
    this.kategorileriAl()
  }

  private KategoriListesi!: AngularFirestoreCollection<Kategori>;
  kategoriler$!: Observable<Kategori[]>;

  kategorileriAl() {
    this.KategoriListesi = this.firestore.collection<Kategori>('Kategoriler');
    this.kategoriler$ = this.KategoriListesi.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data() as Kategori;

          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
}
