export const DECREMENT_POINT = 'counter/DECREMENT_POINT'
export const DECREMENT_CHANCE_GAME = 'counter/DECREMENT_CHANCE_GAME'
export const WALLPAPER_TRUE = 'counter/WALLPAPER_TRUE'
export const WALLPAPER_FALSE = 'counter/WALLPAPER_FALSE'
export const GAME_BOARD_SHOW_FALSE = 'counter/GAME_BOARD_SHOW_FALSE'
export const GAME_BOARD_SHOW_TRUE = 'counter/GAME_BOARD_SHOW_TRUE'
export const REDUCER_GAME_WIN_FALSE = 'counter/REDUCER_GAME_WIN_FALSE'
export const REDUCER_GAME_WIN_TRUE = 'counter/REDUCER_GAME_WIN_TRUE'
export const REDUCER_SET_STATE_CURRENT_WORD = 'counter/REDUCER_SET_STATE_CURRENT_WORD'
export const REDUCER_CLEAR_STATE_CURRENT_WORD = 'counter/REDUCER_CLEAR_STATE_CURRENT_WORD'

const initialState = {
    point: 1000,
    count: 0,
    list_all_banner: ["kodok"],
    chanceGame: 6,
    imagePath: '../presentational/asset/',
    isWallpaperShow: false,
    isGameBoardShow: false,
    isWin: false,
    stateCurrentWord : []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case DECREMENT_POINT: 
      return {
          ...state,
          point: state.point-10
      }
      case DECREMENT_CHANCE_GAME: 
        if(state.chanceGame === 0){
          return {
            ...state,
            chanceGame: 0
          }
        } else{
          return {
              ...state,
              chanceGame: state.chanceGame-1
          }
        }
    case WALLPAPER_TRUE:
        return {
          ...state,
          isWallpaperShow: true
        }   
    case WALLPAPER_FALSE:
      return {
        ...state,
        isWallpaperShow: false
      }
    case GAME_BOARD_SHOW_FALSE:
      return {
        ...state,
        isGameBoardShow: false
      }
    case GAME_BOARD_SHOW_TRUE:
      return {
        ...state,
        isGameBoardShow: true
      }
    case REDUCER_GAME_WIN_FALSE:
      return {
        ...state, 
        isWin: false
      }
    case REDUCER_GAME_WIN_TRUE:
      return {
        ...state,
        isWin: true
      }
    case REDUCER_SET_STATE_CURRENT_WORD:
      return {
        ...state,
        stateCurrentWord: action.payload
      }
    default:
      return state
  }
}
export const decrementPoint = () => {
  return dispatch => {
    dispatch({
      type: DECREMENT_POINT
    })
  }
}
export const actionDecrementChanceGame = () => {
  return dispatch => {
    dispatch({
      type: DECREMENT_CHANCE_GAME
    })
  }
}

export const actionWallpaperTrue = () => {
  return dispatch => {
    dispatch({
      type: WALLPAPER_TRUE
    })
  }
}

export const actionWallpaperFalse = () => {
  return dispatch => {
    dispatch({
      type: WALLPAPER_FALSE
    })
  }
}

export const actionGameBoardFalse = () => {
  return dispatch => {
    dispatch({
      type: GAME_BOARD_SHOW_FALSE
    })
  }
}
export const actionGameBoardTrue = () => {
  return dispatch => {
    dispatch({
      type: GAME_BOARD_SHOW_TRUE
    })
  }
}
export const actionGameWinTrue = () => {
  return dispatch => {
    dispatch({
      type: REDUCER_GAME_WIN_TRUE
    })
  }
}
export const actionGameWinFalse = () => {
  return dispatch => {
    dispatch({
      type: REDUCER_GAME_WIN_FALSE
    })
  }
}
export const actionSetStateCurrentWord = (word) => {
  return dispatch => {
    dispatch({
      type: REDUCER_GAME_WIN_FALSE,
      payload: word
    })
  }
}