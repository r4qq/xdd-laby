import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService, User, Category } from '../../api.service';

@Component({
  selector: 'app-prawy',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './prawy.component.html',
  styleUrls: ['./prawy.component.css']
})
export class PrawyComponent implements OnInit {
  users: User[] = [];
  categories: Category[] = [];
  formData = { uzytkownik_id: null, kategoria: null, tytul: '', tresc: '' };

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getUsers().then(data => this.users = data);
    this.api.getCategories().then(data => this.categories = data);
  }

  onSubmit() {
    if (!this.formData.uzytkownik_id || !this.formData.kategoria) {
      alert('Wypełnij wszystkie pola!');
      return;
    }
    this.api.addAd(this.formData).then(() => {
      alert('Ogłoszenie dodane!');
      this.formData = { uzytkownik_id: null, kategoria: null, tytul: '', tresc: '' };
    });
  }
}