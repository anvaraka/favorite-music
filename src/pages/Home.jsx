import Header from "../components/Header";
import { useState, useContext } from "react";
import { AlbumsContext } from "../context/GeneralContext";
import { IconButton, Button, Card, CardContent, Grid, TextField } from "@mui/material";
import { v4 as uuid4 } from "uuid";

import DeleteIcon from "@mui/icons-material/Delete";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { format } from "date-fns";

function Home() {
  const FILTERED_DATA = "FILTERED_DATA";
  /* state management with context */
  const { allInfo, setAllInfo, searchVal, SetSearchVal, SetSearchFavVal } =
    useContext(AlbumsContext);

  /* Data from form inputs */
  const [album, setAlbum] = useState("");
  const [singer, setSinger] = useState("");
  const [song, setSong] = useState("");
  const [band, setBand] = useState("");

  const ifIncludes = (elementPropertyVal) => elementPropertyVal.toLowerCase().includes(searchVal.toLowerCase())

  const checkSearchVal = ({ song, band, album, singer }) => {
    return ifIncludes(song) || ifIncludes(band) || ifIncludes(album) || ifIncludes(singer)
  }
  const filteredData = allInfo?.filter((el) => searchVal.length ? checkSearchVal(el) : el)


  const date = format(new Date(), "yyyy/mm/dd");
  const joinedData = { date, album, favorites: false, singer, band, song, id: uuid4() };

  /* collecting form input data */
  const handleSubmit = (e) => {
    e.preventDefault();
    setAllInfo([...allInfo, joinedData]);
    setAlbum("");
    setSinger("");
    setSong("");
    setBand("");
  };

  /* Setting the Data to Storage */
  sessionStorage.setItem(FILTERED_DATA, JSON.stringify(allInfo));

  /* deleting the list items from lists */
  const handleDeleteClick = (index) => {
    allInfo.splice(index, 1);
    setAllInfo([...allInfo]);
  };

  /* storing the favorite list items */
  const handleFavClick = (index) => {
    allInfo[index].favorites = true;
    setAllInfo([...allInfo]);
    alert("Added to Favorites");
  };

  const handleSelectSortChange = (e) => {
    switch (e.target.value) {
      case "Newest":
        console.log("Newest");
        break;
      case "Oldest":
        console.log("oldest");
        break;
      case "Album":
        allInfo.forEach((el) => console.log(el.album));
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Header SetSearchFavVal={SetSearchFavVal} SetSearchVal={SetSearchVal} />
      <h1 style={{ justifyContent: "center", textAlign: "center" }}>
        Popular albums and songs
      </h1>

      <div
        style={{ display: "flex", flexDirection: "row" }}
        className="wrapper"
      >
        <Card sx={{ width: "30%", margin: "3%" }}>
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
                    placeholder="Enter Album name"
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

        <Card sx={{ width: "60%", margin: "3%" }}>
          <CardContent>
            <header
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <h2 style={{ color: "greenYellow" }}>List Items</h2>

              <select
                onChange={(e) => handleSelectSortChange(e)}
                defaultValue="Sort"
                style={{ width: "85px", height: "25px", marginTop: "25px" }}
              >
                <option disabled value="Sort">
                  Sort
                </option>
                <option value="Newest">Newest</option>
                <option value="Oldest">Oldest</option>
                <option value="Album">Name</option>
              </select>
            </header>

            <ul
              style={{
                margin: "0",
                display: "flex",
                width: "65%",
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
              {filteredData?.map((el, index) => {
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
                          onClick={() => handleDeleteClick(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          spacing={2}
                          edge="end"
                          onClick={() => handleFavClick(index)}
                        >
                          <BookmarkAddIcon />
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
    </div>
  );
}

export default Home;
