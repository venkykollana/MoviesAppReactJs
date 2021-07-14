import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {withRouter} from 'react-router-dom'

import Header from '../Header'
import Footer from '../Footer'

import TrendingSimpleSlider from '../TrendingSimpleSlider'
import TopRatedMovies from '../TopRatedMovies'
import OriginalsSlider from '../OriginalsSlider'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
}

class Home extends Component {
  state = {status: apiStatus.initial}

  renderOriginalsSection = () => <OriginalsSlider />

  renderTopRatedSection = () => <TopRatedMovies />

  renderTrendingNowSection = () => <TrendingSimpleSlider />

  renderHomeContent = () => (
    <div className="movies-app-home-page-background">
      <div className="movies-app-home-page-first-section">
        <Header />
        <div className="movies-app-home-page-text-content-container">
          <h1 className="movies-app-home-page-text-heading">Super Man</h1>
          <p className="movies-app-home-page-text-description">
            Superman is a fictional superhero who first appeared in American
            comic books published by DC Comics.
          </p>
        </div>
        <div className="movies-app-home-page-button-section">
          <button type="button" className="play-button">
            Play
          </button>
        </div>
      </div>
      <div className="movies-app-home-page-second-section">
        {this.renderTrendingNowSection()}
        {this.renderTopRatedSection()}
        {this.renderOriginalsSection()}
      </div>
      <div className="movies-app-home-page-footer-section">
        <Footer />
      </div>
    </div>
  )

  renderLoadingView = () => (
    <div className="loading-container-background">
      <Header />
      <div testid="loader" className="loader-container">
        <Loader type="Oval" color="#d81f26" height={80} width={80} />
      </div>
    </div>
  )

  renderHomePage = () => {
    const {status} = this.state
    switch (status) {
      case apiStatus.initial:
        return this.renderHomeContent()
      case apiStatus.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return this.renderHomePage()
  }
}

export default withRouter(Home)
