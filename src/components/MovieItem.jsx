import { useState } from "react";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { shades } from "../theme";
import { useNavigate } from "react-router-dom";

const MovieItem = ({ movieItem, url }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const {
    // eslint-disable-next-line no-unused-vars
    palette: { secondary },
  } = useTheme();

  return (
    <Box width={"100%"}>
      <Box
        position="relative"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        <img
          alt={movieItem.name}
          width="300px"
          height="400px"
          src={`${url}`}
          onClick={() => navigate(`/movie/${movieItem.id}`)}
          style={{ cursor: "pointer" }}
        />
        <Box
          display={isHovered ? "block" : "none"}
          position="absolute"
          bottom="10%"
          left="0"
          width="100%"
          padding="0 5%"
        >
          <Box display="flex" justifyContent="space-between">
            <Button
              onClick={() => navigate(`/movie/${movieItem.id}`)}
              sx={{
                backgroundColor: shades.secondary[300],
                color: "white",
                fontWeight: 600,
              }}
            >
              Book now
            </Button>
          </Box>
        </Box>
      </Box>

      <Box mt="3px">
        <Typography>{movieItem.name}</Typography>
      </Box>
    </Box>
  );
};

export default MovieItem;
