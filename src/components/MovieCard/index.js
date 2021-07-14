import {Link, withRouter} from 'react-router-dom'

import './index.css'

const MovieCard = props => {
  const {movieDetails} = props
  const {backdropPath, title, id} = movieDetails

  return (
    <Link to={`/movie-details/${id}`}>
      <img
        src={`https://image.tmdb.org/t/p/original/${backdropPath}`}
        alt={`${title}`}
        className="similar-movie-image"
      />
    </Link>
  )
}

export default withRouter(MovieCard)
