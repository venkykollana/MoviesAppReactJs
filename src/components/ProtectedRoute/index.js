import {Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = props => {
  const requestToken = Cookies.get('request_token')
  if (requestToken === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default ProtectedRoute
