import { createSlice } from "@reduxjs/toolkit";
import data from "../assets/mock-data/data.json";

const initialState = {
  movies: data.movies,
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    bookTickets: (state, action) => {
      // const ticketService = new TicketService();
      // const accountID = _.random(0, 1000000);
      // state.response = ticketService.purchaseTickets(accountID, action.payload);
    },
  },
});

export const { bookTickets } = movieSlice.actions;

export default movieSlice.reducer;
