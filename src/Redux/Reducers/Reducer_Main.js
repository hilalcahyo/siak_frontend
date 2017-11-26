import { combineReducers } from 'redux'
import ReduxCounter from './Reducer_Counter'
import Reducer_Home from './Pages/Reducer_Home'
export default combineReducers({
  ReduxCounter,
  Reducer_Home
});
