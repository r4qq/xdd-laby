import { Component, OnInit, signal, inject } from '@angular/core';
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
  private api = inject(ApiService);
  
  users = signal<User[]>([]);
  categories = signal<Category[]>([]);
  
  // Basic JS object for the form
  formData = { uzytkownik_id: '', kategoria: '', tytul: '', tresc: '' };

  async ngOnInit() {
    this.users.set(await this.api.getUsers());
    this.categories.set(await this.api.getCategories());
  }

  async onSubmit() {
    if (!this.formData.uzytkownik_id || !this.formData.kategoria) {
      alert('Wypełnij wszystkie pola!');
      return;
    }
    
    await this.api.addAd(this.formData);
    alert('Ogłoszenie dodane!');
    this.formData = { uzytkownik_id: '', kategoria: '', tytul: '', tresc: '' };
  }
}