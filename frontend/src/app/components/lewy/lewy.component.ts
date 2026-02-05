import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ApiService, Category } from '../../api.service';
import axios from 'axios';

@Component({
  selector: 'app-lewy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lewy.component.html',
  styleUrls: ['./lewy.component.css']
})
export class LewyComponent implements OnInit {
  categories: Category[] = [];

  constructor(private api: ApiService) {}

  async ngOnInit() {
    await this.api.getCategories().then(data => {this.categories = [...data]
                                          console.log(data)
                                          console.log(this.categories)}
    ).catch((error => {console.log(error)}));

  //   axios.get<Category[]>('http://localhost:3000/categories')
  //     .then(data => this.categories = data.data)
  }
}