import { Component, Input, OnInit } from '@angular/core';
import { DataFlowService } from '../data-flow.service';
import { tarifSira } from '../classes/tarifSira';
import { Kategori } from '../classes/kategori';
import { Observable, Subscription, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Tarif } from '../classes/tarif';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  constructor(
    private dataFlow: DataFlowService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  tarifler$!: Observable<tarifSira[]>;
  tarif$!: Observable<Tarif[]>;
  kategori$!: Observable<Kategori[]>;
  kategoriler$: Observable<Kategori[]> = this.dataFlow.kategoriler$;
  kategoriId!: Observable<string>;
  routeSub!: Subscription;
  kategori_sira!: number;
  index: number = 0;

  ngOnInit() {
    this.tarifler$ = this.dataFlow.tarifSiraEkle();

    this.route.params.subscribe((params) => {
      this.kategori_sira = params['sira'];
    });
    this.route.queryParams.subscribe((params) => {
      this.index = params['index'];
    });

    this.kategoriler$.subscribe((items) => {
      
      this.kategori$ = of([items[this.kategori_sira]]);
      this.kategori$.subscribe((it) => {
        //console.log(it)
      })
      this.tarifler$.subscribe((val) => {
        this.tarif$ = of([val[this.kategori_sira].tarifler[this.index]]);
      });
    });
  }

  duzenle(kategori_sira: number, i: number) {
    console.log(kategori_sira + " " + i)
    let url:string = "/home/edit/" + kategori_sira + "?index=" + i
    this.router.navigateByUrl(url)
  }
}
