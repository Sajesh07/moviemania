import { useState, useEffect } from "react";

const KEY = "44b9e1a3"; // OMDB API key

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      setIsLoading(true);
      setError("");
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          throw new Error("Something went wrong with fetching movies");
        }
        const data = await res.json();

        if (data.Response === "False") {
          throw new Error("Movie not found");
        }

        setMovies(data.Search);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.log(error);
          setError(error.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    fetchMovies();

    // Cleanup function to abort the request
    return function () {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}

