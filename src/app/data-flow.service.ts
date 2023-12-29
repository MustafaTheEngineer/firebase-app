import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Tarif } from './classes/tarif';
import { Observable, map, of } from 'rxjs';
import { Kategori } from './classes/kategori';
import { tarifSira } from './classes/tarifSira';

@Injectable({
  providedIn: 'root',
})
export class DataFlowService {
  constructor(private firestore: AngularFirestore) {}

  index: number = 0;

  private TarifListesi!: AngularFirestoreCollection<Tarif>;
  private KategoriListesi!: AngularFirestoreCollection<Kategori>;
  kategoriler$: Observable<Kategori[]> = this.kategorileriAl();
  tarifler$!: Observable<tarifSira[]>;
  liste: tarifSira[] = [];

  kategorileriAl() {
    this.KategoriListesi = this.firestore.collection<Kategori>('Kategoriler');
    return (this.kategoriler$ = this.KategoriListesi.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data() as Kategori;

          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    ));
  }

  tarifSiraEkle(): Observable<tarifSira[]> {
    this.kategoriler$.subscribe((val) => {
      val.forEach((item) => {
        if (item.tarifler !== '' && item.tarifler !== undefined) {
          this.liste[this.index] = {
            kategori_sira: this.index,
            tarifler: JSON.parse(item.tarifler),
          };
        } else {
          this.liste[this.index] = {
            kategori_sira: this.index,
            tarifler: [],
          };
        }
        ++this.index;
        console.log(this.liste);
      });
      this.index = 0;
    });
    return of(this.liste);
  }

  kategoriEkle(data: Object) {
    this.firestore
      .collection('Kategoriler')
      .add(data)
      .then(() => {
        console.log('Data sent to Firestore successfully!');
      })
      .catch((error) => {
        console.error('Error sending data to Firestore: ', error);
      });
  }

  ekleme!: string;

  async tarifEkle(tarifler: Object[], refID: string) {
    const doc = this.firestore.collection('Kategoriler').doc(refID);
    this.ekleme = JSON.stringify(tarifler);
    doc
      .update({
        tarifler: this.ekleme,
      })
      .then(() => {
        console.log('Data sent to Firestore successfully!');
      })
      .catch((error) => {
        console.error('Error sending data to Firestore: ', error);
      });
  }

  async tarifDuzenle(
    tarifler: Object[],
    originalKategori: string,
    refID: string
  ) {
    if (originalKategori === refID) {
      const doc = this.firestore.collection('Kategoriler').doc(refID);
      this.ekleme = JSON.stringify(tarifler);
      doc
        .update({
          tarifler: this.ekleme,
        })
        .then(() => {
          console.log('Data sent to Firestore successfully!');
        })
        .catch((error) => {
          console.error('Error sending data to Firestore: ', error);
        });
    }
    console.log(originalKategori);
    console.log(refID);
    this.kategoriler$.subscribe((items) => {
      items.forEach((item) => {
        //console.log(Object.values(item)[0])
      });
    });
  }
}
