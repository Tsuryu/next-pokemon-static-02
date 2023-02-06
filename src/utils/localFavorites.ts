import envUtils from './envUtils';

const getFavorites = (): number[] => (envUtils.isServer() ? [] : JSON.parse(localStorage.getItem('favorites') || '[]'));

const toogleFavorite = (id: number) => {
  let favorites: number[] = getFavorites();
  if (favorites.includes(id)) {
    favorites = favorites.filter((favorite) => {
      return favorite !== id;
    });
  } else {
    favorites.push(id);
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));
};

const existInFavorites = (id: number): boolean => {
  const favorites: number[] = getFavorites();

  return favorites.includes(id);
};

export default {
  existInFavorites,
  getFavorites,
  toogleFavorite
};
