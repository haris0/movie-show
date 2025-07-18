import {
  createContext,
  useContext,
} from 'react';
import type { Favorite } from '../types/favorite';

export interface FavoriteContextType{
  favorites : Favorite[];
  addFavorite : (favorites : Favorite) => void;
  removeFavorite : (id : number) => void;
  checkFavorite : (id : number) => boolean;
  countFavorite : number;
}

export const initialTheme: FavoriteContextType = {
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  checkFavorite: () => false,
  countFavorite: 0,
};

export const FavoriteContext = createContext<FavoriteContextType>(initialTheme);

export const useFavoriteContext = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error('useFavoriteContext must be used within a FavoriteProvider');
  }
  return context;
};

