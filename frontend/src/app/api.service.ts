import { Injectable } from '@angular/core';
import axios from 'axios';

export interface Category { id: number; nazwa: string; }
export interface User { id: number; imie: string; nazwisko: string; }
export interface Ad { id: number; tytul: string; tresc: string; telefon: string; kategoria: number; }

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = 'http://localhost:3000';

  private listeners: (() => void)[] = [];

  subscribeToRefresh(callback: () => void) {
    this.listeners.push(callback);
  }

  private triggerRefresh() {
    this.listeners.forEach(fn => fn());
  }

  async getCategories(): Promise<Category[]> {
    const response = await axios.get<Category[]>(`${this.apiUrl}/categories`);
    return response.data;
  }

  async getUsers(): Promise<User[]> {
    const response = await axios.get<User[]>(`${this.apiUrl}/users`);
    return response.data;
  }

  async getAds(categoryIds: number[]): Promise<Ad[]> {
    const params: any = {};
    if (categoryIds.length > 0) {
      params.categories = categoryIds.join(',');
    }
    const response = await axios.get<Ad[]>(`${this.apiUrl}/ads`, { params });
    return response.data;
  }

  async addAd(adData: any): Promise<void> {
    await axios.post(`${this.apiUrl}/ads`, adData);
    this.triggerRefresh();
  }
}