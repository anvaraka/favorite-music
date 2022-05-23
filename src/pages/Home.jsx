import Header from "../components/Header";
import { useState, useContext, useEffect} from "react";
import {AlbumsContext} from '../context/GeneralContex'
import {List, IconButton, Button, Card, CardContent, Grid, TextField} from "@mui/material";
import { v4 as uuidv4 } from "uuid";

import DeleteIcon from "@mui/icons-material/Delete";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import {format} from 'date-fns'


/* Getting the Data from Storage  */
const FILTERED_DATA = 'FILTERED_DATA'
const getDataFromStorage = () => {
  const renderingData = sessionStorage.getItem(FILTERED_DATA)
  if(renderingData){
    return JSON.parse(sessionStorage.getItem(FILTERED_DATA))
  } else {
    return []
  }
}


function Home() {

  /* state management with context */
  const {favorite, SetFavorite, searchVal, SetSearchVal, SetSearchFavVal } = useContext(AlbumsContext)

  /* Data from form inputs */
  const [album, setAlbum] = useState("");
  const [singer, setSinger] = useState("");
  const [song, setSong] = useState("");
  const [band, setBand] = useState("");
  const [allInfo, setAllInfo] = useState(getDataFromStorage());
  

  
  /* filtering the lists for search*/
  const filteredData = allInfo.filter(el=>el?.album?.toLowerCase().includes(searchVal))

  /* collecting form input data */
  const handleSubmit = (e) => {
    e.preventDefault();
    const date = format(new Date(),'yyyy/mm/dd')
    const joinedData = { date, album, favorites: false, singer, band, song, id: uuidv4()};
    setAllInfo([...allInfo, joinedData]);
    sessionStorage.setItem(FILTERED_DATA, JSON.stringify(allInfo))
    setAlbum("");
    setSinger("");
    setSong("");
    setBand("");
  };
  
  /* deleteing the list items from lists */
  const handleDeleteClick = (index) =>{
    allInfo.splice(index, 1)
    setAllInfo([...allInfo])
  }

  /* storing the favorit list items */
  const handleFavClick = (index) =>{
      
      SetFavorite([...favorite, filteredData[index]])
      alert('Added to Favorites')
  }

  const handleSelectSortChange = (e) =>{
  
    switch (e.target.value) {
      
      case 'Newest':
      console.log('Newest')
      break
    case 'Oldest': 
      console.log('oldest')
      break
    case 'Album':
          allInfo.map(el=>console.log(el.album))
    default:
        break;
    }
  }

/* Setting the Data to Storage */
  useEffect(()=>{
    
  },[])

  

  return (
    <div >
      <Header SetSearchFavVal={SetSearchFavVal} SetSearchVal={SetSearchVal}/>
      <h1 style={{ justifyContent: "center", textAlign: "center" }}>
        Popular albums and songs
      </h1>

    <div style={{display: 'flex', flexDirection: 'row'}} className="wrapper">

      <Card sx={{ width: "30%", margin: '3%' }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <h2 style={{ color: "greenYellow" }}>User Form</h2>

            <Grid container spacing={1}>
              <Grid xs={12} item>
                <TextField
                  value={band}
                  onChange={(e) => setBand(e.target.value)}
                  label="Band"
                  placeholder="Enter Band name"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
                  value={album}
                  onChange={(e) => setAlbum(e.target.value)}
                  label="Album"
                  placeholder="Enter Albome name"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid xs={6} item>
                <TextField
                  value={singer}
                  onChange={(e) => setSinger(e.target.value)}
                  label="Singer"
                  placeholder="Enter Singer name"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid xs={6} item>
                <TextField
                  value={song}
                  onChange={(e) => setSong(e.target.value)}
                  label="Song"
                  placeholder="Enter Song name"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid style={{ textAlign: "center" }} xs={12} item>
                <Button type="submit">Add To List</Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      <Card sx={{ width: "60%", margin: '3%' }}>
        <CardContent>
          <header style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
          <h2 style={{ color: "greenYellow" }}>List Items</h2>

        <select onChange={(e)=>handleSelectSortChange(e)} defaultValue='Sort' style={{ width: '85px', height: '25px', marginTop: '25px'}}>
        <option disabled value="Sort">Sort</option>
        <option value="Newest">Newest</option>
        <option value="Oldest">Oldest</option>
        <option value="Album">Name</option>
      </select>
          </header>
          
          
          <ul style={{margin: '0', display: "flex", justifyContent: "center", justifyContent: "space-around", listStyle: "none"}}>
            <li>Band</li>
            <li>Album</li>
            <li>Singer</li>
            <li>Song</li>
          </ul>

          <Grid  container spacing={2}>
          {filteredData.map((el, index) => {
            return (
                    <Grid  key={el.id} item xs={12} >

                        <Card  >
                          <CardContent sx={{display: 'flex', flexDirection: 'row', justifyContent:'space-evenly'}}>

                          {/* Todo added all the in grid items */}
                            <Grid item xs={4} >
                            {el.band}
                            </Grid>

                        <List sx={{width: '70%'}}>{el.band} | {el.album} | {el.singer} | {el.song}</List>
                        <IconButton spacing={2} edge="end" aria-label="delete" onClick={()=>handleDeleteClick(index)}>
                          <DeleteIcon  />
                        </IconButton> 
                        <IconButton spacing={2} edge="end" onClick={()=>handleFavClick(index)}>
                          <BookmarkAddIcon />
                        </IconButton>
                        
                        </CardContent>
                        </Card>

                    </Grid>
                    )
            })}
          </Grid>

        </CardContent>
      </Card>

      </div>
    </div>
  );
}

export default Home;
