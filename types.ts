export interface Song {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  platform: 'spotify' | 'youtube';
  link: string;
  releaseDate: string;
}

export interface TattooItem {
  id: string;
  title: string;
  imageUrl: string;
  style: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  isNew?: boolean;
}

export interface NavItem {
  label: string;
  path: string;
}