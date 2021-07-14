import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {BiSearch} from 'react-icons/bi'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
import './index.css'

class Header extends Component {
  state = {
    showSearchContainer: false,
    showHamburgerIcon: false,
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

  renderSearchSection = () => {
    const {searchInput} = this.state
    return (
      <div className="input-container">
        <input
          type="search"
          className="input-section"
          value={searchInput}
          onChange={this.onChangeSearch}
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

  renderNavLinks = () => (
    <div className="nav-links-container">
      <ul className="nav-items-container">
        <Link to="/" className="link-nav-item">
          <li className="nav-item">Home</li>
        </Link>
        <Link to="/popular" className="link-nav-item">
          <li className="nav-item">Popular</li>
        </Link>
        <Link to="/account" className="link-nav-item">
          <li className="nav-item">Account</li>
        </Link>
      </ul>
      <AiFillCloseCircle
        className="cross-icon"
        onClick={this.onClickCrossIcon}
      />
    </div>
  )

  onClickHamburger = () => {
    this.setState({showHamburgerIcon: true})
  }

  render() {
    const {showSearchContainer, showHamburgerIcon} = this.state
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
              <Link to="/" className="link-nav-item">
                <li className="nav-item">Home</li>
              </Link>
              <Link to="/popular" className="link-nav-item">
                <li className="nav-item">Popular</li>
              </Link>
              <Link to="/account" className="link-nav-item">
                <li className="nav-item">Account</li>
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
              <img
                src="https://res.cloudinary.com/dyhda963d/image/upload/v1626273945/Avatar_sihprd.png"
                alt="profile"
                className="profile-image"
              />
            </Link>
          </div>
        </div>
        {showHamburgerIcon && this.renderNavLinks()}
      </nav>
    )
  }
}

export default withRouter(Header)
