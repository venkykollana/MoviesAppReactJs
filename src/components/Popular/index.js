import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {FaLessThan, FaGreaterThan} from 'react-icons/fa'

import './index.css'
import Header from '../Header'
import Footer from '../Footer'
import MovieCard from '../MovieCard'

class Popular extends Component {
  state = {pageNo: 1, popularMovieList: {}, isLoading: true, searchInput: ''}

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    const {pageNo, searchInput} = this.state
    this.setState({isLoading: true})
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=12bc7a61a4e0b573539da286534a13a1&language=en-US&page=${pageNo}&query=${searchInput}`
    const response = await fetch(url)
    const data = await response.json()
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
        video: eachResult.video,
        voteAverage: eachResult.vote_average,
        voteCount: eachResult.vote_count,
        genreIds: eachResult.genre_ids,
      })),
    }
    this.setState({popularMovieList: formattedData, isLoading: false})
  }

  onClickLeftArrow = () => {
    const {pageNo} = this.state
    console.log(pageNo)
    if (pageNo > 0) {
      this.setState(
        prevState => ({pageNo: prevState.pageNo - 1}),
        this.getPopularMovies,
      )
    }
  }

  onClickRightArrow = () => {
    const {popularMovieList} = this.state
    const {totalPages} = popularMovieList
    const {pageNo} = this.state
    console.log(pageNo)
    if (pageNo <= totalPages) {
      this.setState(
        prevState => ({pageNo: prevState.pageNo + 1}),
        this.getPopularMovies,
      )
    }
  }

  onChangeSearchInput = value => {
    this.setState({searchInput: value}, this.getPopularMovies)
  }

  renderPopularMoviesSection = () => {
    const {popularMovieList, pageNo} = this.state
    const {totalPages} = popularMovieList
    return (
      <>
        <div className="popular-movies-card-container">
          {popularMovieList.results.map(eachMovie => (
            <MovieCard movieDetails={eachMovie} key={eachMovie.id} />
          ))}
        </div>
        <div className="page-number-container">
          <FaLessThan
            className="page-number-left-icon"
            onClick={this.onClickLeftArrow}
          />
          <p className="page-number-text">
            {pageNo} of {totalPages}
          </p>
          <FaGreaterThan
            className="page-number-right-icon"
            onClick={this.onClickRightArrow}
          />
        </div>
        <Footer />
      </>
    )
  }

  renderLoader = () => (
    <div testid="loader" className="loader-container">
      <Loader type="Oval" color="#d81f26" height={80} width={80} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <div className="popular-page-background-container">
        <Header onChangeSearchInput={this.onChangeSearchInput} />
        {isLoading ? this.renderLoader() : this.renderPopularMoviesSection()}
      </div>
    )
  }
}

export default Popular
