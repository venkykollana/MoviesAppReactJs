import Cookies from 'js-cookie'

import './index.css'
import Header from '../Header'

const Account = props => {
  const {history} = props
  const onClickLogout = () => {
    Cookies.remove('request_token')
    history.replace('/login')
  }
  return (
    <>
      <Header />
      <div className="account-page-container">
        <h1 className="account-heading">Account</h1>
        <hr className="separator" />
        <div className="text-container">
          <h1 className="membership">Membership</h1>
          <div>
            <p className="email">Email Address</p>
            <p className="password">Password: ********</p>
          </div>
        </div>
        <hr className="separator" />
        <div className="text-container">
          <h1 className="membership">Plan Details</h1>
          <p className="email">Premium</p>
          <p className="ultra">Ultra HD</p>
        </div>
        <hr className="separator" />

        <div className="button-container">
          <button
            type="button"
            className="logout-button"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  )
}

export default Account
