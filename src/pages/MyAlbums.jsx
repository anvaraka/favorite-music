import Header from "../components/Header";
import {useState, useContext} from 'react'
import {AlbumsContext} from '../context/GeneralContex'
import {List, IconButton, Button, Card, CardContent, Grid, TextField} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";




function MyAlbums() {
    const {favorite, SetFavorite} = useContext(AlbumsContext)

const handleDeleteClick = (index) =>{
    favorite.splice(index, 1)
    SetFavorite([...favorite])
}


  return (
    <div>
      <Header />
      <h1 style={{ justifyContent: "center", textAlign: "center" }}>My albums</h1>

      <Card sx={{ width: "85%", margin: 'auto',  }}>
        <CardContent>
          <h2 style={{ color: "greenYellow" }}>List Items</h2>
          
          <ul style={{ display: "flex", justifyContent: "center", justifyContent: "space-around", listStyle: "none"}}>
            <li>Band</li>
            <li>Album</li>
            <li>Singer</li>
            <li>Song</li>
          </ul>

          <Grid  container spacing={2}>
          {favorite.map((el, index) => {
            return (
                    <Grid  key={el.id} item xs={12} >

                        <Card  >
                          <CardContent sx={{display: 'flex', flexDirection: 'row', justifyContent:'space-evenly'}}>

                        <List sx={{width: '70%'}}>{el.band} | {el.album} | {el.singer} | {el.song}</List>
                        <IconButton spacing={2} edge="end" aria-label="delete" onClick={()=>handleDeleteClick(index)}>
                          <DeleteIcon  />
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
  );
}

export default MyAlbums;
