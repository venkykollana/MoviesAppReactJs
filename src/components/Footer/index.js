import {withRouter} from 'react-router-dom'

import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="icon-container">
      <a href="https://www.google.com">
        <FaGoogle className="icon" />
      </a>
      <a href="https://www.twitter.com">
        <FaTwitter className="icon" />
      </a>
      <a href="https:www.instagram.com">
        <FaInstagram className="icon" />
      </a>
      <a href="https://www.youtube.com">
        <FaYoutube className="icon" />
      </a>
    </div>
    <p className="contact">Contact Us</p>
  </div>
)

export default withRouter(Footer)
