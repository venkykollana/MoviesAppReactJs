import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

import './index.css'
import Header from '../Header'
import SimilarMovies from '../SimilarMovies'

const GenreDetails = props => {
  const {genreDetails} = props

  return <li className="genre-item">{genreDetails.name}</li>
}

const Language = props => {
  const {languageDetails} = props

  return <li className="genre-item">{languageDetails.englishName}</li>
}

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class MovieDetails extends Component {
  state = {
    specificMovieDetails: {},
    pageStatus: apiStatus.initial,
  }

  componentDidMount() {
    this.getSpecificMovieDetails()
  }

  renderFailureMovieDetails = () => (
    <>
      <Header />
      <div className="failure-movie-page-background">
        <h1 className="failure-page-heading">Lost Your Way?</h1>
        <p className="failure-page-description">
          Sorry, we can’t find that page. You’ll find lots to explore on the
          home page
        </p>
        <Link to="/">
          <button className="failure-page-button" type="button">
            Netflix Home
          </button>
        </Link>
        <p className="failure-page-message">Error code NSES-404</p>
      </div>
    </>
  )

  getSpecificMovieDetails = async () => {
    this.setState({pageStatus: apiStatus.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=12bc7a61a4e0b573539da286534a13a1&language=en-US`
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok === true) {
      // console.log(data)
      const formattedData = {
        adult: data.adult,
        backdropPath: data.backdrop_path,
        budget: data.budget,
        homepage: data.homepage,
        id: data.id,
        imdbId: data.imdb_id,
        originalLanguage: data.original_language,
        originalTitle: data.original_title,
        overview: data.overview,
        popularity: data.popularity,
        posterPath: data.poster_path,
        releaseDate: data.release_date,
        revenue: data.revenue,
        runtime: data.runtime,
        status: data.status,
        tagline: data.tagline,
        title: data.title,
        video: data.video,
        voteAverage: data.vote_average,
        voteCount: data.vote_count,
        belongsToCollections: data.belongs_to_collections,
        genres: data.genres.map(eachGenre => ({
          id: eachGenre.id,
          name: eachGenre.name,
        })),
        productionCompanies: data.production_companies.map(eachCompany => ({
          id: eachCompany.id,
          logoPath: eachCompany.logo_path,
          name: eachCompany.name,
          originCountry: eachCompany.origin_country,
        })),
        productionCountries: data.production_countries.map(eachCountry => ({
          iso_3166_1: eachCountry.iso_3166_1,
          name: eachCountry.name,
        })),
        spokenLanguages: data.spoken_languages.map(eachLanguage => ({
          englishName: eachLanguage.english_name,
          iso_639_1: eachLanguage.iso_639_1,
          name: eachLanguage.name,
        })),
      }

      // console.log(formattedData)

      this.setState({
        specificMovieDetails: formattedData,
        pageStatus: apiStatus.success,
      })
    } else {
      this.setState({pageStatus: apiStatus.failure})
    }
  }

  specificMovieBudgetDetails = () => {
    const {specificMovieDetails} = this.state
    const {budget} = specificMovieDetails

    const crores = budget / 10000000
    return `${crores} Crores`
  }

  specificMovieReleaseDate = () => {
    const {specificMovieDetails} = this.state
    const {releaseDate} = specificMovieDetails
    const date = new Date(releaseDate)
    return `${date.getDate()}th ${date.toLocaleString('en-US', {
      month: 'long',
    })} ${date.getFullYear()}`
  }

  specificAudioDetails = () => {
    const {specificMovieDetails} = this.state
    const {spokenLanguages} = specificMovieDetails

    return spokenLanguages.map(eachLanguage => (
      <Language key={eachLanguage.name} languageDetails={eachLanguage} />
    ))
  }

  specificGenreDetails = () => {
    const {specificMovieDetails} = this.state
    const {genres} = specificMovieDetails

    return genres.map(eachGenre => (
      <GenreDetails key={eachGenre.id} genreDetails={eachGenre} />
    ))
  }

  specificMovieRuntime = () => {
    const {specificMovieDetails} = this.state
    const {runtime} = specificMovieDetails

    const specificRuntime = `${Math.floor(runtime / 60)}h ${Math.floor(
      runtime % 60,
    )}m`

    return <p className="specific-movie-runtime-status">{specificRuntime}</p>
  }

  specificMovieCensor = () => {
    const {specificMovieDetails} = this.state
    const {adult} = specificMovieDetails

    if (adult === true) {
      return <p className="specific-movie-censor-status">A</p>
    }
    return <p className="specific-movie-censor-status">UA</p>
  }

  specificMovieReleasedYear = () => {
    const {specificMovieDetails} = this.state
    const {releaseDate} = specificMovieDetails
    const newDate = new Date(releaseDate)
    return <p className="specific-movie-fullYear">{newDate.getFullYear()}</p>
  }

  renderSpecificMoviePage = () => {
    const {specificMovieDetails} = this.state
    const {
      backdropPath,
      title,
      overview,
      voteCount,
      voteAverage,
    } = specificMovieDetails

    return (
      <div className="specific-movie-details-background-container">
        <div
          className="specific-movie-details-top-section"
          style={{
            backgroundImage: `url(
              https://image.tmdb.org/t/p/original/${backdropPath})`,
          }}
        >
          <Header />
          <div className="specific-movie-details-text-container">
            <h1 className="specific-movie-title">{title}</h1>
            <div className="specific-movie-censor-runtime-container">
              {this.specificMovieRuntime()}
              {this.specificMovieCensor()}
              {this.specificMovieReleasedYear()}
            </div>
            <p className="specific-movie-overview">{overview}</p>

            <button type="button" className="play-button">
              Play
            </button>
          </div>
        </div>
        <div className="specific-movie-details-2-container">
          <ul className="genres-container">
            <li className="genre-heading">Generes</li>
            {this.specificGenreDetails()}
          </ul>
          <ul className="genres-container">
            <li className="genre-heading">Audio Available</li>
            {this.specificAudioDetails()}
          </ul>
          <ul className="genres-container">
            <li className="genre-heading">Rating Count</li>
            <li className="genre-item">{voteCount}</li>
            <li className="genre-heading">Rating Average</li>
            <li className="genre-item">{voteAverage}</li>
          </ul>
          <ul className="genres-container">
            <li className="genre-heading">Budget</li>
            <li className="genre-item">{this.specificMovieBudgetDetails()}</li>
            <li className="genre-heading">Release Date</li>
            <li className="genre-item">{this.specificMovieReleaseDate()}</li>
          </ul>
        </div>
        <h1 className="more-likes-heading">More like this</h1>
        <SimilarMovies />
      </div>
    )
  }

  renderLoader = () => (
    <div className="loading-container-background">
      <Header />
      <div testid="loader" className="loader-container">
        <Loader type="Oval" color="#d81f26" height={80} width={80} />
      </div>
    </div>
  )

  renderPageStatus = () => {
    const {pageStatus} = this.state
    switch (pageStatus) {
      case apiStatus.success:
        return this.renderSpecificMoviePage()
      case apiStatus.failure:
        return this.renderFailureMovieDetails()
      case apiStatus.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return this.renderPageStatus()
  }
}

export default MovieDetails
