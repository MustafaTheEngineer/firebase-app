import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { Tarif } from '../classes/tarif';
import { DataFlowService } from '../data-flow.service';
import { Kategori } from '../classes/kategori';
import { JsonPipe } from '@angular/common';
import { tarifSira } from '../classes/tarifSira';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private firestore: AngularFirestore,
    private dataFlow: DataFlowService,
    private router: Router
  ) {}

  tarifler$!: Observable<tarifSira[]>;
  kategoriler$: Observable<Kategori[]> = this.dataFlow.kategoriler$;

  ngOnInit() {
    this.tarifler$ = this.dataFlow.tarifSiraEkle()
  }

  detaylar(kategori_sira: number, i: number) {
    console.log(kategori_sira + ' ' + i);
    let url: string = '/home/details/' + kategori_sira + '?index=' + i;
    this.router.navigateByUrl(url);
  }
}
