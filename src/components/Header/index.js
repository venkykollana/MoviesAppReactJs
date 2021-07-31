import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {BiSearch} from 'react-icons/bi'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
import {CgProfile} from 'react-icons/cg'
import './index.css'

class Header extends Component {
  state = {
    showSearchContainer: false,
    showHamburgerIcon: false,
    highlightHomeLink: false,
    highlightPopularLink: false,
    highlightAccountLink: false,
    searchInput: '',
  }

  onClickSearchIconInContainer = () => {
    this.setState({showSearchContainer: false})
  }

  onChangeSearch = event => {
    const {onChangeSearchInput} = this.props
    onChangeSearchInput(event.target.value)
    console.log(event.target.value)
    this.setState({searchInput: event.target.value})
  }

  onClickSearchInputSection = () => {
    const {history} = this.props
    history.replace('/search')
  }

  renderSearchSection = () => {
    const {searchInput} = this.state
    return (
      <div className="input-container">
        <input
          type="search"
          className="input-section"
          value={searchInput}
          onChange={this.onChangeSearch}
          onClick={this.onClickSearchInputSection}
        />
        <BiSearch
          className="search-icon"
          onClick={this.onClickSearchIconInContainer}
        />
      </div>
    )
  }

  onClickSearchIcon = () => {
    this.setState({showSearchContainer: true})
  }

  onClickCrossIcon = () => {
    this.setState({showHamburgerIcon: false})
  }

  onClickHomeLink1 = () => {
    this.setState({highlightHomeLink: true})
  }

  onClickPopularLink1 = () => {
    this.setState({highlightPopularLink: true})
  }

  onClickAccountLink = () => {
    this.setState({highlightAccountLink: true})
  }

  renderNavLinks = () => {
    const {
      highlightHomeLink,
      highlightPopularLink,
      highlightAccountLink,
    } = this.state
    const homeLinkClassName = highlightHomeLink ? 'active-link-item' : ''
    const popularLinkClassName = highlightPopularLink ? 'active-link-item' : ''
    const accountLinkClassName = highlightAccountLink ? 'active-link-item' : ''
    return (
      <div className="nav-links-container">
        <ul className="nav-items-container">
          <Link
            to="/"
            className="link-nav-item"
            onClick={this.onClickHomeLink1}
          >
            <li className={`nav-item ${homeLinkClassName}`}>Home</li>
          </Link>
          <Link
            to="/popular"
            className="link-nav-item"
            onClick={this.onClickPopularLink1}
          >
            <li className={`nav-item ${popularLinkClassName}`}>Popular</li>
          </Link>
          <Link
            to="/account"
            className="link-nav-item"
            onClick={this.onClickAccountLink}
          >
            <li className={`nav-item ${accountLinkClassName}`}>Account</li>
          </Link>
        </ul>
        <AiFillCloseCircle
          className="cross-icon"
          onClick={this.onClickCrossIcon}
        />
      </div>
    )
  }

  onClickHamburger = () => {
    this.setState({showHamburgerIcon: true})
  }

  onClickHomeLink2 = () => {
    this.setState({highlightHomeLink: true})
  }

  onClickPopularLink2 = () => {
    this.setState({highlightPopularLink: true})
  }

  render() {
    const {showSearchContainer, showHamburgerIcon} = this.state
    const {highlightHomeLink, highlightPopularLink} = this.state
    const homeLinkClassName = highlightHomeLink ? 'active-link-item' : ''
    const popularLinkClassName = highlightPopularLink ? 'active-link-item' : ''
    return (
      <nav className="header-container">
        <div className="nav-items-container">
          <Link to="/" className="small-logo">
            <img
              src="https://res.cloudinary.com/dyhda963d/image/upload/v1626156986/movies_qznojr.png"
              alt="movie-logo"
              className="movie-logo"
            />
          </Link>
          <div className="medium-logo-container">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dyhda963d/image/upload/v1626156986/movies_qznojr.png"
                alt="movie-logo"
                className="movie-logo"
              />
            </Link>
            <ul className="nav-items-medium-container">
              <Link
                to="/"
                className="link-nav-item"
                onClick={this.onClickHomeLink2}
              >
                <li className={`nav-item ${homeLinkClassName}`}>Home</li>
              </Link>
              <Link
                to="/popular"
                className="link-nav-item"
                onClick={this.onClickPopularLink2}
              >
                <li className={`nav-item ${popularLinkClassName}`}>Popular</li>
              </Link>
            </ul>
          </div>

          <div className="links-container">
            {showSearchContainer ? (
              this.renderSearchSection()
            ) : (
              <BiSearch
                className="search-icon"
                onClick={this.onClickSearchIcon}
              />
            )}
            <GiHamburgerMenu
              className="list-menu"
              onClick={this.onClickHamburger}
            />
            <Link to="/account">
              <CgProfile className="profile-image" />
            </Link>
          </div>
        </div>
        {showHamburgerIcon && this.renderNavLinks()}
      </nav>
    )
  }
}

export default withRouter(Header)
