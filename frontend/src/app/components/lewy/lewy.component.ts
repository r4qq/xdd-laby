import { Component, OnInit, signal, inject } from '@angular/core';
import { ApiService, Category } from '../../api.service';

@Component({
  selector: 'app-lewy',
  standalone: true,
  templateUrl: './lewy.component.html',
  styleUrls: ['./lewy.component.css']
})
export class LewyComponent implements OnInit {
  private api = inject(ApiService);

  categories = signal<Category[]>([]);

  async ngOnInit() {
    const data = await this.api.getCategories();
    this.categories.set(data); // Set the signal value
  }
}