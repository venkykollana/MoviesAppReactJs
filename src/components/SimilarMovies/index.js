import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import './index.css'
import MovieCard from '../MovieCard'

class SimilarMovies extends Component {
  state = {
    specificMovieSimilarList: {},
    isLoading: true,
  }

  componentDidMount() {
    this.getMoreLikeSection()
  }

  getMoreLikeSection = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({isLoading: true})

    const url = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=12bc7a61a4e0b573539da286534a13a1&language=en-US&page=1`
    const response = await fetch(url)
    console.log(this.props)
    console.log(response)
    const data = await response.json()
    console.log(data)
    const formattedData = {
      page: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      results: data.results.map(eachResult => ({
        adult: eachResult.adult,
        backdropPath: eachResult.backdrop_path,
        id: eachResult.id,
        originalLanguage: eachResult.original_language,
        originalTitle: eachResult.original_title,
        overview: eachResult.overview,
        popularity: eachResult.popularity,
        posterPath: eachResult.poster_path,
        releaseDate: eachResult.release_date,
        title: eachResult.title,
        video: eachResult.title,
        voteAverage: eachResult.vote_average,
        voteCount: eachResult.vote_count,
        genreIds: eachResult.genre_ids,
      })),
    }
    this.setState({specificMovieSimilarList: formattedData, isLoading: false})
  }

  renderMoreLikeSection = () => {
    const {specificMovieSimilarList} = this.state
    const {results} = specificMovieSimilarList

    return (
      <div className="similar-movies-container">
        {results.map(eachMovie => (
          <MovieCard key={eachMovie.id} movieDetails={eachMovie} />
        ))}
      </div>
    )
  }

  renderLoader = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#d81f26" height={80} width={80} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return isLoading ? this.renderLoader() : this.renderMoreLikeSection()
  }
}

export default withRouter(SimilarMovies)
