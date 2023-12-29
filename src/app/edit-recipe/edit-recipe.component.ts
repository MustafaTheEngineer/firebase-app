import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataFlowService } from '../data-flow.service';
import { Tarif } from '../classes/tarif';
import { Kategori } from '../classes/kategori';
import { Observable, Subscription, of } from 'rxjs';
import { tarifSira } from '../classes/tarifSira';
import { ActivatedRoute } from '@angular/router';
import { KategoriId } from '../classes/kategoriId';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss'],
})
export class EditRecipeComponent implements OnInit {
  tarifForm!: FormGroup; // Form group for Tarif
  malzeme!: string;
  kategoriId!: string;
  kategoriler!: Object[];
  kategori_tarifler: Object[] = [];
  tarifler: Tarif[] = [];
  //tarifler

  tarifler$!: Observable<tarifSira[]>;
  tarif$!: Observable<Tarif[]>;
  kategori$!: Observable<Kategori[]>;
  kategoriler$: Observable<Kategori[]> = this.dataFlow.kategoriler$;
  kategori_keys!: Observable<KategoriId[]>;
  key_liste: KategoriId[] = [];
  routeSub!: Subscription;
  kategori_sira!: number;
  tarifin_kategori_idsi!: string;
  index: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private dataFlow: DataFlowService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.createTarifForm();
    this.kategoriler$.subscribe((items:Kategori[]) => {
      this.kategoriler = items;
    });

    this.tarifler$ = this.dataFlow.tarifSiraEkle();

    this.route.params.subscribe((params:any) => {
      this.kategori_sira = params['sira'];
    });
    this.route.queryParams.subscribe((params:any) => {
      this.index = params['index'];
    });

    this.kategoriler$.subscribe((items:Kategori[]) => {
      let index = 0;
      items.forEach((val) => {
        this.key_liste[index] = {
          id: Object.values(val)[0],
          kategori_ismi: val.kategori_ismi,
        };
        ++index;
      });
      index = 0;
      this.kategori_keys = of(this.key_liste);
      this.kategori$ = of([items[this.kategori_sira]]);
      this.kategori$.subscribe((it:Kategori[]) => {
        this.tarifin_kategori_idsi = Object.values(it[0])[0];
      });
      this.tarifler$.subscribe((val:tarifSira[]) => {
        this.tarif$ = of([val[this.kategori_sira].tarifler[this.index]]);
      });
    });
  }

  createTarifForm() {
    this.tarifForm = this.formBuilder.group({
      tarif_ismi: ['', Validators.required],
      tarif_aciklamasi: ['', Validators.required],
      malzemeler: this.formBuilder.array([], Validators.required), // Assuming malzemeler is an array of strings
      hazirlama_zamani: ['', Validators.required],
      ekleme_tarihi: [Date.now, Validators.required],
    });
  }

  setTarifForm(vee: Tarif) {
    this.tarifForm.controls['tarif_ismi'].setValue(vee.tarif_ismi);
    this.tarifForm.controls['tarif_aciklamasi'].setValue(vee.tarif_aciklamasi);
    this.tarifForm.controls['hazirlama_zamani'].setValue(vee.hazirlama_zamani);
  }

  malzemeEkle() {
    const malzeme: string = (
      document.getElementById('malzemeler') as HTMLInputElement
    ).value;
    console.log(malzeme);
    this.tarifForm.value.malzemeler.push(malzeme);
  }

  kategoriTariflereEkle(data:Tarif) {
    for (let index = 0; index < this.kategoriler.length; index++) {
      if (Object.values(this.kategoriler[index])[0] === this.kategoriId) {
        if ((this.kategoriler[index] as Kategori).tarifler != undefined) {
          if (
            Array.isArray(
              JSON.parse((this.kategoriler[index] as Kategori).tarifler)
            )
          ) {
            let vee = JSON.parse(
              (this.kategoriler[index] as Kategori).tarifler
            );
            for (let j = 0; j < vee.length; j++) {
              let k = this.kategori_tarifler.length;
              this.kategori_tarifler[k] = vee[j];
            }
          } else {
            let k = this.kategori_tarifler.length;
            this.kategori_tarifler[k] = data
          }
        }
      }
    }
    this.kategoriler.forEach((kategori) => {
      if(Object.values(kategori)[0] == this.tarifin_kategori_idsi){
        let liste = (JSON.parse((kategori as Kategori).tarifler) as Array<Kategori>)
        console.log(this.kategori_tarifler)
      }
    })
  }

  baskaFonk(){
    
  }

  onSubmit() {
    const formData: Tarif = this.tarifForm.value;
    this.kategoriTariflereEkle(formData);
    /* if (Array.isArray(this.kategori_tarifler)) {
      this.kategori_tarifler.push(formData);
      this.dataFlow.tarifDuzenle(this.kategori_tarifler,this.tarifin_kategori_idsi ,this.kategoriId);
    } */
  }
}
