import { combineReducers } from 'redux'
import ReduxCounter from './Reducer_Counter'
import Reducer_Home from './Pages/Reducer_Home'
import Reducer_SIAK from './Pages/SIAK/Reducer_SIAK'

export default combineReducers({
  ReduxCounter,
  Reducer_Home,
  Reducer_SIAK
});
