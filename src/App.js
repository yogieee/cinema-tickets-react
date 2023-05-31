import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./scenes/home/Home";
import Navbar from "./scenes/global/Navbar";
import MovieDetails from "./scenes/movieDetails/MovieDetails";
import Confirmation from "./scenes/confirmation/Confirmation";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="movie/:movieId" element={<MovieDetails />} />
          <Route path="confirmation/success" element={<Confirmation />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
