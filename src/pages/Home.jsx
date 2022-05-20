import Header from "../components/Header";
import { AlbumsContext } from "../context/GeneralContex";
import {useContext} from 'react'

function Home() {
  const {info} = useContext(AlbumsContext)



  console.log(info, 'aaaaaaaaaaaaaaaaaaa');

  return (
    <div>
      <Header />
      <h1>Popular Albums And Songs</h1>

      
    </div>
  );
}

export default Home;
