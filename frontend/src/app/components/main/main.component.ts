import { Component, OnInit, signal, effect, inject } from '@angular/core';
import { ApiService, Category, Ad } from '../../api.service';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  private api = inject(ApiService);
  
  categories = signal<Category[]>([]);
  ads = signal<Ad[]>([]);
  // Store selected IDs in a signal array
  selectedIds = signal<number[]>([]);

  constructor() {
    // This "effect" runs every time selectedIds OR the service refreshSignal changes
    effect(() => {
      this.loadAds(this.selectedIds());
      this.api.refreshSignal(); 
    });
  }

  async ngOnInit() {
    const data = await this.api.getCategories();
    this.categories.set(data);
    // Start with all categories selected
    this.selectedIds.set(data.map(c => c.id));
  }

  toggleCat(id: number) {
    const current = this.selectedIds();
    if (current.includes(id)) {
      this.selectedIds.set(current.filter(val => val !== id));
    } else {
      this.selectedIds.set([...current, id]);
    }
  }

  async loadAds(ids: number[]) {
    const data = await this.api.getAds(ids);
    this.ads.set(data);
  }
}