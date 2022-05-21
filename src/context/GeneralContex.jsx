import {createContext, useState} from 'react'


export const AlbumsContext = createContext([])

export const AlbumsProvider = ({children}) =>{

    const [favorite, SetFavorite] = useState([])
    
      const data = {
      favorite: favorite,
      SetFavorite: SetFavorite
    }

    return(
        <AlbumsContext.Provider value={data}>
            {children}
        </AlbumsContext.Provider>
    )
}