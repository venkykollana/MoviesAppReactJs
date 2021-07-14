import {Link} from 'react-router-dom'

import './index.css'

import Header from '../Header'

const NotFound = () => (
  <div className="not-found-container">
    <Header />
    <div className="failure-movie-page-background">
      <h1 className="failure-page-heading">Lost Your Way?</h1>
      <p className="failure-page-description">
        Sorry, we can’t find that page. You’ll find lots to explore on the home
        page
      </p>
      <Link to="/">
        <button className="failure-page-button" type="button">
          Netflix Home
        </button>
      </Link>
      <p className="failure-page-message">Error code NSES-404</p>
    </div>
  </div>
)

export default NotFound
