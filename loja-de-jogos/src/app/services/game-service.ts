import { Injectable } from '@angular/core';
import { Game } from '../entities/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private games = [
    { name: 'Jogo 1', price: 59.99, boxSize: '30x30x10', description: 'Descrição do Jogo 1', coverImage: 'path/to/image1.jpg' },
    { name: 'Jogo 2', price: 69.99, boxSize: '25x25x8', description: 'Descrição do Jogo 2', coverImage: 'path/to/image2.jpg' },
    { name: 'Jogo 3', price: 79.99, boxSize: '35x35x12', description: 'Descrição do Jogo 3', coverImage: 'path/to/image3.jpg' }
  ];

  getGames(): Game[] {
    return this.games;
  }
}