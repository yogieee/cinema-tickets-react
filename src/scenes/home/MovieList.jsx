import React from "react";
import Box from "@mui/material/Box";
import MovieItem from "../../components/MovieItem";
import { Typography, Divider } from "@mui/material";
import { useSelector } from "react-redux";

// imports all images from assets folder
const importAll = (r) =>
  r.keys().reduce((acc, item) => {
    acc[item.replace("./", "")] = r(item);
    return acc;
  }, {});

export const imageImports = importAll(
  require.context("../../assets/mock-images", false, /\.(png|jpe?g|svg)$/)
);

const MovieList = () => {
  const movies = useSelector((state) => state.movie.movies);

  return (
    <Box width="80%" margin="60px auto">
      <Typography variant="h3" textAlign="center" m="20px auto">
        <b>Now showing</b>
      </Typography>
      <Divider />
      <Box
        margin="30px auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {movies.map((item, i) => (
          <MovieItem
            movieItem={item}
            url={Object.values(imageImports)[i]}
            key={`${item.name}-${item.id}`}
          />
        ))}
      </Box>
    </Box>
  );
};

export default MovieList;
