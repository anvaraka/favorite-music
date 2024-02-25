import { createContext, useState } from "react";

export const AlbumsContext = createContext([]);

/* Getting the Data from Storage for */
const FILTERED_DATA = 'FILTERED_DATA'
const getDataFromStorage = () => {
  const renderingData = sessionStorage.getItem(FILTERED_DATA)
  return renderingData ? JSON.parse(renderingData) : []
}


export const AlbumsProvider = ({ children }) => {
  const [favorite, SetFavorite] = useState(getDataFromStorage());
  const [searchVal, SetSearchVal] = useState("");
  const [searchFavVal, SetSearchFavVal] = useState("");
  const [allInfo, setAllInfo] = useState(getDataFromStorage())

  const data = {
    allInfo: allInfo,
    setAllInfo: setAllInfo,
    favorite: favorite,
    SetFavorite: SetFavorite,
    searchVal: searchVal,
    SetSearchVal: SetSearchVal,
    searchFavVal: searchFavVal,
    SetSearchFavVal: SetSearchFavVal
  };

  return (
    <AlbumsContext.Provider value={data}>{children}</AlbumsContext.Provider>
  );
};
