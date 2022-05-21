import Header from "../components/Header";
import { useState, useContext } from "react";
import {AlbumsContext} from '../context/GeneralContex'
import {List, IconButton, Button, Card, CardContent, Grid, TextField} from "@mui/material";
import { v4 as uuidv4 } from "uuid";

import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";


function Home() {

  const {SetFavorite, favorite} = useContext(AlbumsContext)
  const [album, setAlbum] = useState("");
  const [singer, setSinger] = useState("");
  const [song, setSong] = useState("");
  const [band, setBand] = useState("");
  const [allInfo, setAllInfo] = useState([]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const joinedData = { album, favorites: false, singer, band, song, id: uuidv4()};

    setAllInfo([...allInfo, joinedData]);
    setAlbum("");
    setSinger("");
    setSong("");
    setBand("");
  };

  const handleDeleteClick = (index) =>{
    allInfo.splice(index, 1)
    setAllInfo([...allInfo])
  }
  const handleFavClick = (index) =>{
      SetFavorite([...favorite, allInfo[index]])
      alert('Added to Favorites')
  }

  console.log(favorite);

  return (
    <div >
      <Header />
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
          <h2 style={{ color: "greenYellow" }}>List Items</h2>
          
          <ul style={{ display: "flex", justifyContent: "center", justifyContent: "space-around", listStyle: "none"}}>
            <li>Band</li>
            <li>Album</li>
            <li>Singer</li>
            <li>Song</li>
          </ul>

          <Grid  container spacing={2}>
          {allInfo.map((el, index) => {
            return (
                    <Grid  key={el.id} item xs={12} >

                        <Card  >
                          <CardContent sx={{display: 'flex', flexDirection: 'row', justifyContent:'space-evenly'}}>

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
