import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Kategori } from '../classes/kategori';
import { DataFlowService } from '../data-flow.service';
import { Tarif } from '../classes/tarif';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent  implements OnInit {
  
  
  constructor(private formBuilder: FormBuilder,private dataFlow:DataFlowService) { }
  kategoriForm!: FormGroup; // Form group for Kategori

  kategoriler$ = this.dataFlow.kategorileriAl()

  ngOnInit() {
    this.createKategoriForm();
  }

  createKategoriForm() {
    this.kategoriForm = this.formBuilder.group({
      kategori_ismi: ['', Validators.required],
      ebeveyn_kategori: ['', Validators.required],
      tarifler: this.formBuilder.array<Tarif>([]) // Assuming tarifler is an array of Tarif
    });
  }

  onSubmit() {
    if (this.kategoriForm.valid) {
      const formData: Kategori = this.kategoriForm.value;
      // Do something with the form data
      this.dataFlow.kategoriEkle(formData)
    }
  }

}
