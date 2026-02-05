import { Injectable, signal } from '@angular/core';
import axios from 'axios';

export interface Category { id: number; nazwa: string; }
export interface User { id: number; imie: string; nazwisko: string; }
export interface Ad { id: number; tytul: string; tresc: string; telefon: string; kategoria: number; }

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = 'http://localhost:3000';
  
  // This signal will act as a "ping" to tell components to reload ads
  refreshSignal = signal(0);

  async getCategories(): Promise<Category[]> {
    const response = await axios.get(`${this.apiUrl}/categories`);
    return response.data;
  }

  async getUsers(): Promise<User[]> {
    const response = await axios.get(`${this.apiUrl}/users`);
    return response.data;
  }

  async getAds(categoryIds: number[]): Promise<Ad[]> {
    const params = categoryIds.length > 0 ? { categories: categoryIds.join(',') } : {};
    const response = await axios.get(`${this.apiUrl}/ads`, { params });
    return response.data;
  }

  async addAd(adData: any) {
    await axios.post(`${this.apiUrl}/ads`, adData);
    // Increment the signal to notify everyone
    this.refreshSignal.set(this.refreshSignal() + 1);
  }
}