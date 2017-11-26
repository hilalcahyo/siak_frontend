import React from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
    decrementPoint,
    actionDecrementChanceGame,
    actionWallpaperFalse,
    actionWallpaperTrue,
    actionGameBoardFalse,
    actionGameBoardTrue
  } from '../../Redux/Reducers/Reducer_Counter'

class About extends React.Component {
    constructor(props){
        super(props)
    }
  render() {
    return (
        <div>
            About {this.props.point}
            <br/>
            <button onClick={() => this.props.changePage()}>Go to MAIN page via redux</button>
        </div>
    );
  }
}

//export default Home;
const mapStateToProps = state => ({
    point: state.ReduxCounter.point,
    count: state.ReduxCounter.count,
    list_all_banner: state.ReduxCounter.banner,
    imagePath: state.ReduxCounter.imagePath,  
    chanceGame: state.ReduxCounter.chanceGame,
  })
  
const mapDispatchToProps = dispatch => bindActionCreators({
    decrementPoint,
    actionDecrementChanceGame,
    actionWallpaperTrue,
    actionWallpaperFalse,
    actionGameBoardTrue,
    actionGameBoardFalse,
    changePage: () => push('/')
  }, dispatch)
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(About)
  