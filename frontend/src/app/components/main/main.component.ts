import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { ApiService, Category, Ad } from '../../api.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FormsModule], 
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  categories: Category[] = [];
  ads: Ad[] = [];
  selectedCats: { [key: number]: boolean } = {};

  constructor(private api: ApiService) {}

  async ngOnInit() {
    this.categories = await this.api.getCategories();
    this.categories.forEach(c => this.selectedCats[c.id] = true);
    this.loadAds();
    this.api.subscribeToRefresh(() => this.loadAds());
  }

  toggleCat(id: number) {
    this.selectedCats[id] = !this.selectedCats[id];
    this.loadAds();
  }

  loadAds() {
    const activeIds = Object.keys(this.selectedCats)
      .filter(k => this.selectedCats[+k])
      .map(Number);
    this.api.getAds(activeIds).then(data => {
                                        this.ads = data
                                        console.log(data)
                                        console.log(this.ads)
                                      }).catch((error => {console.log(error)}));
  }
}