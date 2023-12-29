import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tarif } from '../classes/tarif';
import { DataFlowService } from '../data-flow.service';
import { Kategori } from '../classes/kategori';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss'],
})
export class AddRecipeComponent implements OnInit {
  tarifForm!: FormGroup; // Form group for Tarif
  malzeme!: string;
  kategoriId!: string;
  kategoriler$ = this.dataFlow.kategorileriAl();
  kategoriler!: Object[];
  kategori_tarifler: Object[] = [];
  tarifler: Tarif[] = [];
  //tarifler

  constructor(
    private formBuilder: FormBuilder,
    private dataFlow: DataFlowService
  ) {}

  ngOnInit() {
    this.createTarifForm();
    this.kategoriler$.subscribe((items) => {
      this.kategoriler = items;
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

  malzemeEkle() {
    const malzeme: string = (
      document.getElementById('malzemeler') as HTMLInputElement
    ).value;
    console.log(malzeme);
    this.tarifForm.value.malzemeler.push(malzeme);
  }

  kategoriTariflereEkle() {
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
              this.kategori_tarifler[k] = vee[j]
            }
          } else {
            let k = this.kategori_tarifler.length;
            this.kategori_tarifler[k] = JSON.parse(
              (this.kategoriler[index] as Kategori).tarifler
            );
          }
        }
      }
    }
    console.log(this.kategori_tarifler);
  }

  onSubmit() {
    this.kategori_tarifler = [];
    const formData: Tarif = this.tarifForm.value;
    this.kategoriTariflereEkle();
    if (Array.isArray(this.kategori_tarifler)) {
      this.kategori_tarifler[this.kategori_tarifler.length] = formData;
      this.dataFlow.tarifEkle(this.kategori_tarifler, this.kategoriId);
    }
  }
}
