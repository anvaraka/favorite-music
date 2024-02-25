import { Link } from "react-router-dom";
import { useState, useContext } from 'react'
import { AlbumsContext } from '../context/GeneralContext'
import { debounce } from 'lodash'

function Header() {

  const [search, SetSearch] = useState('')
  const { SetSearchVal, SetSearchFavVal } = useContext(AlbumsContext)

  const handleSubmitSearch = (e) => {
    e.preventDefault()
    SetSearchVal(search)
    SetSearchFavVal(search)
  }

  const handleChangeInput = debounce((e) => {
    const string = e.target.value.toLowerCase()
    SetSearch(string)
    SetSearchVal(string)
    SetSearchFavVal(string)
  }, 500)

  return (
    <ul
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        listStyle: "none",
        fontSize: '20px'
      }}
    >
      <li>
        <Link style={{ textDecoration: "none", }} to="/">
          Home
        </Link>
      </li>
      <li>
        <Link style={{ textDecoration: "none" }} to="/MyAlbums">
          My Albums
        </Link>
      </li>

      <form onSubmit={handleSubmitSearch}>
        <input onChange={(e) => handleChangeInput(e)} /><button type='submit'>Search</button>
      </form>
    </ul>
  );
}

export default Header;
