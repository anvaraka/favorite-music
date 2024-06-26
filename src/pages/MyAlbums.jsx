import Header from "../components/Header";
import { useState, useContext } from "react";
import { AlbumsContext } from "../context/GeneralContext";
import { IconButton, Card, CardContent, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function MyAlbums() {
  const FILTERED_DATA = "FILTERED_DATA";
  const { allInfo, SetSearchVal, searchFavVal, SetSearchFavVal } = useContext(AlbumsContext);
  const [shallow, setShallow] = useState(allInfo);


  const ifIncludes = (elementPropertyVal) => elementPropertyVal.toLowerCase().includes(searchFavVal.toLowerCase())

  const checkSearchFavVal = ({ song, band, album, singer }) => {
    return ifIncludes(song) || ifIncludes(band) || ifIncludes(album) || ifIncludes(singer)
  }

  const trueFavorite = shallow.filter((el) => {
    const isTrue = el?.favorites && searchFavVal.length > 0
    return isTrue ? checkSearchFavVal(el) : el?.favorites
  })

  const handleDeleteClick = (el) => {
    shallow.forEach((item) => {
      if (item.id === el.id) {
        console.log(item);
        item.favorites = false;
        setShallow([...shallow]);
        sessionStorage.setItem(FILTERED_DATA, JSON.stringify(shallow));
      } else {
        console.log("noo");
      }
    });
  };

  return (
    <div>
      <Header SetSearchVal={SetSearchVal} SetSearchFavVal={SetSearchFavVal} />
      <h1 style={{ justifyContent: "center", textAlign: "center" }}>
        My albums
      </h1>

      <Card sx={{ width: "85%", margin: "auto" }}>
        <CardContent>
          <h2 style={{ color: "greenYellow" }}>List Items</h2>

          <ul
            style={{
              display: "flex",
              width: "70%",
              justifyContent: "space-between",
              listStyle: "none",
            }}
          >
            <li>Band</li>
            <li>Album</li>
            <li>Singer</li>
            <li>Song</li>
          </ul>

          <Grid container spacing={2}>
            {trueFavorite.map((el, index) => {
              return (
                <Grid key={el.id} item xs={12}>
                  <Card>
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <Grid item xs={3}>
                        {el.band}
                      </Grid>
                      <Grid item xs={3}>
                        {el.album}
                      </Grid>
                      <Grid item xs={3}>
                        {el.singer}
                      </Grid>
                      <Grid item xs={3}>
                        {el.song}
                      </Grid>
                      <IconButton
                        spacing={2}
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteClick(el, index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}

export default MyAlbums;
