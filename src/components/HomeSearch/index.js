import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {FaLessThan, FaGreaterThan} from 'react-icons/fa'

import './index.css'
import Header from '../Header'
import MovieCard from '../MovieCard'

const apiSearchStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class HomeSearch extends Component {
  state = {
    searchInput: 'h',
    pageNo: 1,
    searchMoviesList: {},
    searchStatus: apiSearchStatus.inprogress,
  }

  componentDidMount() {
    this.getSearchMovies()
  }

  onChangeSearchInput = value => {
    // console.log(`search: ${value}`)
    this.setState({searchInput: value}, this.getSearchMovies)
  }

  getFailureSearchResults = () => {
    const {searchInput} = this.state

    return (
      <div className="failure-search-container">
        <img
          src="https://res.cloudinary.com/dyhda963d/image/upload/v1626253342/Group_7394_a69jnk.png"
          alt="failure-search"
          className="failure-search-image"
        />
        <p className="failure-search-description">
          Your search for {searchInput} did not find any matches.
        </p>
      </div>
    )
  }

  getSearchMovies = async () => {
    this.setState({searchStatus: apiSearchStatus.inProgress})
    const {searchInput, pageNo} = this.state

    const url = `https://api.themoviedb.org/3/search/movie?api_key=12bc7a61a4e0b573539da286534a13a1&language=en-US&query=${searchInput}&page=${pageNo}`
    const response = await fetch(url)
    //  console.log(response)
    const data = await response.json()
    //  console.log(data)
    if (data.total_pages !== 0) {
      const formattedSearchList = {
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
      this.setState({
        searchMoviesList: formattedSearchList,
        searchStatus: apiSearchStatus.success,
      })
    } else {
      this.setState({searchStatus: apiSearchStatus.failure})
    }
  }

  onClickLeftArrow = () => {
    const {pageNo} = this.state
    if (pageNo > 0) {
      this.setState(
        prevState => ({pageNo: prevState.pageNo - 1}),
        this.getSearchMovies,
      )
    }
  }

  onClickRightArrow = () => {
    const {searchMoviesList} = this.state
    const {totalPages} = searchMoviesList
    const {pageNo} = this.state
    if (pageNo <= totalPages) {
      this.setState(
        prevState => ({pageNo: prevState.pageNo + 1}),
        this.getSearchMovies,
      )
    }
  }

  renderSearchMoviesItems = () => {
    const {pageNo, searchMoviesList} = this.state
    const {totalPages} = searchMoviesList

    return (
      <div className="search-page-background-container">
        <div className="search-page-container">
          {searchMoviesList.results.map(eachMovie => (
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
      </div>
    )
  }

  renderLoader = () => (
    <div testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#d81f26" height={80} width={80} />
    </div>
  )

  renderSearchPage = () => {
    const {searchStatus} = this.state
    switch (searchStatus) {
      case apiSearchStatus.success:
        return this.renderSearchMoviesItems()
      case apiSearchStatus.failure:
        return this.getFailureSearchResults()
      default:
        return this.renderLoader()
    }
  }

  render() {
    return (
      <>
        <Header onChangeSearchInput={this.onChangeSearchInput} />
        {this.renderSearchPage()}
      </>
    )
  }
}

export default HomeSearch
