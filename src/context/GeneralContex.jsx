import { createContext, useState } from "react";

export const AlbumsContext = createContext([]);

/* Getting the Data from Storage for MyAlbums */
const FILTERED_FAVORITE_DATA = 'FILTERED_FAVORITE_DATA'
const getDataFromStorage = () => {
  const renderingData = sessionStorage.getItem(FILTERED_FAVORITE_DATA)
  if(renderingData){
    return JSON.parse(sessionStorage.getItem(FILTERED_FAVORITE_DATA))
  } else {
    return []
  }
}

export const AlbumsProvider = ({ children }) => {
  const [favorite, SetFavorite] = useState(getDataFromStorage());
  const [searchVal, SetSearchVal] = useState("");
  const [searchFavVal, SetSearchFavVal] = useState("");

  const data = {
    favorite: favorite,
    SetFavorite: SetFavorite,
    searchVal, searchVal,
    SetSearchVal,SetSearchVal,
    searchFavVal,searchFavVal,
    SetSearchFavVal,SetSearchFavVal
  };

  return (
    <AlbumsContext.Provider value={data}>{children}</AlbumsContext.Provider>
  );
};
