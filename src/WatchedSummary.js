import { average } from "./utils";

export default function WatchedSummary({ watched }) {
  const avgImdbRating = average(
    watched.map((movie) => movie.imdbRating).filter(Boolean)
  ).toFixed(2);
  const avgUserRating = average(
    watched.map((movie) => movie.userRating).filter(Boolean)
  ).toFixed(2);
  const totalRuntime = watched
    .map((movie) => movie.runtime)
    .filter(Boolean)
    .reduce((acc, cur) => acc + cur, 0);
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{totalRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
