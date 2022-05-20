import {createContext, useState, useEffect} from 'react'
import axios from 'axios'

export const AlbumsContext = createContext([])

export const AlbumsProvider = ({children}) =>{

    const [info, setInfo] = useState([])
    const callApi = async () => {
        try {
          const res = await axios.get(
            "https://gist.githubusercontent.com/jasonbaldridge/2668632/raw/e56320c485a33c339791a25cc107bf70e7f1d763/music.json"
          );
          setInfo(res.data)
        } catch (error) {
          console.log(error);
          
        }
      };
      
      console.log(info, '2131321321312312312')

      const data = {
        info: info,
        setInfo: setInfo,

    }
    
      useEffect(() => {
        callApi();
      }, []);

    return(
        <AlbumsContext.Provider value={data}>
            {children}
        </AlbumsContext.Provider>
    )
}