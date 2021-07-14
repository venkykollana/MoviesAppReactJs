import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Slider from 'react-slick'

import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  className: 'slides',
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
}

class TrendingSimpleSlider extends Component {
  state = {trendingMoviesList: [], isLoading: true}

  componentDidMount() {
    this.fetchTrendingMoviesData()
  }

  fetchTrendingMoviesData = async () => {
    this.setState({isLoading: true})
    const url =
      'https://api.themoviedb.org/3/trending/all/week?api_key=12bc7a61a4e0b573539da286534a13a1'
    const response = await fetch(url)
    const data = await response.json()
    // console.log(data)
    const formattedTrendingList = {
      page: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      results: data.results.map(eachResult => ({
        adult: eachResult.adult,
        backdropPath: eachResult.backdrop_path,
        id: eachResult.id,
        mediaType: eachResult.media_type,
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
    // console.log(formattedTrendingList)

    this.setState({trendingMoviesList: formattedTrendingList, isLoading: false})
  }

  renderLoader = () => (
    <div testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#d81f26" height={80} width={80} />
    </div>
  )

  renderSlider = () => {
    const {trendingMoviesList} = this.state
    const {results} = trendingMoviesList
    // console.log(results)

    return (
      <Slider {...settings}>
        {results.map(movie => {
          const movieImage = `https://image.tmdb.org/t/p/original/${movie.posterPath}`
          // console.log(movie)
          return (
            <div className="react-slick-item" key={movie.id}>
              <Link to={`/movie-details/${movie.id}`}>
                <img
                  className="poster"
                  src={movieImage}
                  alt={`${movie.title}-movie`}
                />
              </Link>
            </div>
          )
        })}
      </Slider>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="slick-app-container">
        <h1 className="trending-name">Trending Movies</h1>
        {isLoading ? this.renderLoader() : this.renderSlider()}
      </div>
    )
  }
}

export default withRouter(TrendingSimpleSlider)
