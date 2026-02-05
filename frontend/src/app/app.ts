import { Component } from '@angular/core';

import { BannerComponent } from './components/banner/banner.component';
import { LewyComponent } from './components/lewy/lewy.component';
import { MainComponent } from './components/main/main.component';
import { PrawyComponent } from './components/prawy/prawy.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    BannerComponent, 
    LewyComponent, 
    MainComponent, 
    PrawyComponent, 
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}