import {
  Box,
  Button,
  IconButton,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
  Grid,
  Alert,
} from "@mui/material";
import _ from "lodash";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../theme";
import { useSelector } from "react-redux";
import { imageImports } from "../home/MovieList";
import TicketService from "../../service/pairtest/TicketService.js";

const MovieDetails = () => {
  const navigate = useNavigate();

  const movies = useSelector((state) => state.movie.movies);

  const { movieId } = useParams();
  const [dateObjs, setDateObjs] = useState([]);
  const [selectedDate, setSelectedDate] = useState([]);
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [movie, setMovie] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleDates = (event, newDate) => {
    if (newDate.length) {
      setSelectedDate(newDate.slice(-1));
    }
  };

  function getMovieItem() {
    setMovie(movies[movieId - 1]);
  }

  const getMovieDates = () => {
    const dateObj = [];
    _.times(7, (i) => {
      const currentDate = new Date(
        new Date().getTime() + i * 24 * 60 * 60 * 1000
      );

      dateObj.push(
        currentDate.toLocaleString("default", {
          weekday: "long",
        }) +
          " " +
          currentDate.getDate()
      );
    });

    setDateObjs(dateObj);
  };

  const confirmBooking = async () => {
    //date validation
    if (!selectedDate.length) {
      setErrorMsg("Please select a date to confirm your booking");
      return;
    } else if (adultCount === 0 && childCount === 0 && infantCount === 0) {
      setErrorMsg("Please add ticket before proceeding");
      return;
    } else {
      setErrorMsg("");
    }
    try {
      const accountID = _.random(0, 1000000);
      const result = new TicketService().purchaseTickets(accountID, {
        ADULT: adultCount,
        CHILD: childCount,
        INFANT: infantCount,
      });

      if (result.paymentStatus) {
        navigate("/confirmation/success");
        setTimeout(() => navigate("/"), 5000);
      }
    } catch (error) {
      setErrorMsg(error.name + ": " + error.message);
    }
  };

  useEffect(() => {
    getMovieItem();
    getMovieDates();
  }, [movieId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box width="80%" m="80px auto">
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        {/* IMAGES */}
        <Box flex="1 1 40%" mb="40px">
          <img
            alt={movie?.name}
            width="100%"
            height="100%"
            src={Object.values(imageImports)[movieId - 1]}
            style={{ objectFit: "contain" }}
          />
        </Box>

        {/* ACTIONS */}
        <Box flex="1 1 50%" mb="40px">
          <Box display="flex" justifyContent="space-between">
            <Box>{`Home/${movie?.name}`}</Box>
          </Box>
          <Box m="65px 0 25px 0">
            <Typography variant="h3">{movie?.name}</Typography>
            <Typography sx={{ mt: "20px" }}>
              {movie?.longDescription}
            </Typography>
          </Box>
          {/* Alerts */}
          {errorMsg.length > 1 && <Alert severity="error">{errorMsg}</Alert>}

          {/* DATE TOGGLE */}
          <ToggleButtonGroup
            value={selectedDate}
            onChange={handleDates}
            aria-label="dates"
            sx={{ mt: "10px", width: "min-content" }}
          >
            {dateObjs.map((key) => (
              <ToggleButton key={key} value={key}>
                <Typography variant="h4" sx={{ p: "0 5px" }}>
                  {key}
                </Typography>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <Grid container alignItems="center" ml="5px" spacing={3}>
            <Grid item xs={2}>
              <Typography sx={{ fontWeight: "bold", m: "10px 0" }}>
                Ticket Type
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ fontWeight: "bold", m: "10px 0 10px 20px" }}>
                Quantity
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography
                sx={{ fontWeight: "bold", textAlign: "center", m: "10px 0" }}
              >
                Price
              </Typography>
            </Grid>
          </Grid>
          {/* ADULT */}
          <Grid container alignItems="center" ml="5px" spacing={3}>
            <Grid item xs={2}>
              <Typography variant="h4" sx={{ fontWeight: "bold", m: "10px 0" }}>
                Adult
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Box
                display="flex"
                alignItems="center"
                border={`1.5px solid ${shades.neutral[300]}`}
                minHeight="50px"
                width="fit-content"
                m="5px 0"
              >
                <IconButton
                  onClick={() => setAdultCount(Math.max(adultCount - 1, 0))}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography sx={{ p: "0 5px" }}>{adultCount}</Typography>
                <IconButton onClick={() => setAdultCount(adultCount + 1)}>
                  <AddIcon />
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Typography
                variant="h4"
                sx={{ textAlign: "center", fontWeight: "bold" }}
              >
                {`£${adultCount * 20}`}
              </Typography>
            </Grid>
          </Grid>
          {/* CHILD */}
          <Grid container alignItems="center" ml="5px" spacing={3}>
            <Grid item xs={2}>
              <Typography variant="h4" sx={{ fontWeight: "bold", m: "10px 0" }}>
                Child
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Box
                display="flex"
                alignItems="center"
                border={`1.5px solid ${shades.neutral[300]}`}
                minHeight="50px"
                width="fit-content"
                m="5px 0"
              >
                <IconButton
                  onClick={() => setChildCount(Math.max(childCount - 1, 0))}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography sx={{ p: "0 5px" }}>{childCount}</Typography>
                <IconButton onClick={() => setChildCount(childCount + 1)}>
                  <AddIcon />
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Typography
                variant="h4"
                sx={{ textAlign: "center", fontWeight: "bold" }}
              >
                {`£${childCount * 10}`}
              </Typography>
            </Grid>
          </Grid>
          {/* INFANT */}
          <Grid container alignItems="center" ml="5px" spacing={3}>
            <Grid item xs={2}>
              <Typography variant="h4" sx={{ fontWeight: "bold", m: "10px 0" }}>
                Infant
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Box
                display="flex"
                alignItems="center"
                border={`1.5px solid ${shades.neutral[300]}`}
                minHeight="50px"
                width="fit-content"
                m="5px 0"
              >
                <IconButton
                  onClick={() => setInfantCount(Math.max(infantCount - 1, 0))}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography sx={{ p: "0 5px" }}>{infantCount}</Typography>
                <IconButton onClick={() => setInfantCount(infantCount + 1)}>
                  <AddIcon />
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Typography
                variant="h4"
                sx={{ textAlign: "center", fontWeight: "bold" }}
              >
                {`£${infantCount * 0}`}
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Grid mt="10px" container spacing={2}>
            <Grid item xs={4}>
              <Button
                sx={{
                  display: "flex",
                  backgroundColor: "#222222",
                  color: "white",
                  borderRadius: 0,
                  minWidth: "150px",
                  padding: "10px 40px",
                }}
                onClick={() => confirmBooking()}
              >
                Confirm Booking
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Typography
                variant="h3"
                sx={{
                  display: "flex",
                  m: "10px",
                  p: "0 5px",
                  fontWeight: "bold",
                }}
              >
                Total - {adultCount * 20 + childCount * 10}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default MovieDetails;
