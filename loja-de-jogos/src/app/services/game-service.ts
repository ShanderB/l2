import { Injectable } from '@angular/core';
import { Game } from '../entities/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private games: Game[] = [
    { id: '1', name: 'Jogo 1', price: 59.99, boxHeight: 30, boxWidth: 30, boxLength: 10, description: 'Descrição do Jogo 1', coverImage: 'path/to/image1.jpg' },
    { id: '2', name: 'Jogo 2', price: 69.99, boxHeight: 25, boxWidth: 25, boxLength: 8, description: 'Descrição do Jogo 2', coverImage: 'path/to/image2.jpg' },
    { id: '3', name: 'Jogo 3', price: 79.99, boxHeight: 35, boxWidth: 35, boxLength: 12, description: 'Descrição do Jogo 3', coverImage: 'path/to/image3.jpg' }
  ];

  getGames(): Game[] {
    return this.games;
  }
}