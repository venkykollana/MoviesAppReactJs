import {BrowserRouter, Switch, Route} from 'react-router-dom'
import './App.css'

import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import MovieDetails from './components/MovieDetails'
import HomeSearch from './components/HomeSearch'
import Popular from './components/Popular'
import NotFound from './components/NotFound'
import Account from './components/Account'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute
        exact
        path="/movie-details/:id"
        component={MovieDetails}
      />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/search" component={HomeSearch} />
      <ProtectedRoute exact path="/popular" component={Popular} />
      <ProtectedRoute exact path="/account" component={Account} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App
