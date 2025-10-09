import WatchedMovies from "./WatchedMovies";

export default function WatchedMoviesList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovies
          key={movie.imdbID}
          movie={movie}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}
