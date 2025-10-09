import React, { useEffect, useState, useRef } from "react";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";
import { useKey } from "./useKey";

// Import components
import Navbar from "./Navbar";
import Searchbar from "./Searchbar";
import NumResults from "./NumResults";
import Main from "./Main";
import Box from "./Box";
import MovieList from "./MovieList";
import MovieDetails from "./MovieDetails";
import WatchedSummary from "./WatchedSummary";
import WatchedMoviesList from "./WatchedMoviesList";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

export default function App() {
  const [watched, setWatched] = useLocalStorageState("watched", []);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(query);
  const searchInputRef = useRef(null);

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => {
      // Check if movie already exists in watched list
      if (
        watched.find((watchedMovie) => watchedMovie.imdbID === movie.imdbID)
      ) {
        return watched; // Don't add duplicate
      }
      return [...watched, movie];
    });
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  // Set initial document title and handle title changes
  useEffect(() => {
    document.title = "React App - Moviemania";
  }, []);

  // Reset title when no movie is selected (going back to list)
  useEffect(() => {
    if (!selectedId) {
      document.title = "React App - Moviemania";
    }
  }, [selectedId]);

  // Handle Enter key to focus search bar
  useKey("Enter", function (event) {
    // Get the currently focused element
    const activeElement = document.activeElement;

    // Check if focus is already in an input/textarea or contentEditable element
    const isInputElement =
      activeElement &&
      (activeElement.tagName === "INPUT" ||
        activeElement.tagName === "TEXTAREA" ||
        activeElement.contentEditable === "true");

    // Only focus search if not already focused and not in another input
    if (!isInputElement && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  });

  // Handle Escape key to close movie details
  useKey("Escape", function () {
    if (selectedId) {
      setSelectedId(null);
    }
  });

  return (
    <>
      <Navbar>
        <Searchbar query={query} setQuery={setQuery} ref={searchInputRef} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
        </Box>
        {/* Another way of doing it is using explicit prop technique:
        <Box element={<MovieList movies={movies} />}/>  */}

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              movie={movies}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
