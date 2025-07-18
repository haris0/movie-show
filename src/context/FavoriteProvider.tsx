import {
  useEffect,
  useMemo,
  useState,
  useCallback,
  type PropsWithChildren,
  useRef,
} from 'react';
import type { Favorite } from '../types/favorite';
import { FavoriteContext, initialTheme, type FavoriteContextType } from './FavoriteContext';

const STORAGE_KEY = 'favorites';

export const FavoriteContextProvider = ({ children }: PropsWithChildren) => {
  const initialRender = useRef(true);
  const [favorites, setFavorites] = useState<Favorite[]>(initialTheme.favorites);

  const addFavorite = useCallback((newFavorites: Favorite) => {
    const index = favorites.findIndex((fav) => fav.id === newFavorites.id);

    if(index === -1) {
      setFavorites((prev) => [...prev, newFavorites]);
    }
  }, [favorites]);

  const removeFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };
  const checkFavorite = useCallback(
    (id: number) => favorites.some((item) => item.id === id),
    [favorites]
  );
  const countFavorite = useMemo(() => favorites.length, [favorites]);

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem(STORAGE_KEY) as string) || []);
  }, []);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const contextValue = useMemo<FavoriteContextType>(() => ({
    favorites,
    addFavorite,
    removeFavorite,
    checkFavorite,
    countFavorite,
  }), [addFavorite, checkFavorite, countFavorite, favorites]);

  return (
    <FavoriteContext.Provider value={contextValue}>
      {children}
    </FavoriteContext.Provider>
  );
};
