import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cat } from '../../../core/models/cat.model';

const CARD_PALETTES = [
  { grad: 'linear-gradient(135deg, #FF6B0022, #FF8C0022)', accent: '#FF6B00', badge: 'badge-blue', tag: 'Elite' },
  { grad: 'linear-gradient(135deg, #FF336622, #FF004022)', accent: '#FF3366', badge: 'badge-violet', tag: 'Royal' },
  { grad: 'linear-gradient(135deg, #FFB80022, #FF8A0022)', accent: '#FFB800', badge: 'badge-gold', tag: 'Golden' },
  { grad: 'linear-gradient(135deg, #00E67622, #00C85322)', accent: '#00E676', badge: 'badge-emerald', tag: 'Rare' },
  { grad: 'linear-gradient(135deg, #FF6B0022, #FF336622)', accent: '#FF6B00', badge: 'badge-rose', tag: 'Exotic' },
];

const CAT_IMAGES = [
  'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&h=280&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=280&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=280&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=280&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1494256997604-768d1f608cac?w=400&h=280&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=400&h=280&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=400&h=280&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1581888227599-779811939961?w=400&h=280&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400&h=280&fit=crop&auto=format',
];

@Component({
  selector: 'app-cat-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cat-card.component.html',
  styleUrl: './cat-card.component.scss'
})
export class CatCardComponent {
  cat = input.required<Cat>();
  idx = input<number>(0);
  onEdit   = output<Cat>();
  onDelete = output<string>();
  onView   = output<Cat>();

  palette() { return CARD_PALETTES[this.idx() % CARD_PALETTES.length]; }

  imageUrl() {
    const hash = this.cat().id.charCodeAt(0) + this.cat().id.charCodeAt(1);
    return CAT_IMAGES[hash % CAT_IMAGES.length];
  }
}
