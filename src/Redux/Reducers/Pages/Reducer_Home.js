export const UPDATE_RESULT_POISSON = 'counter/UPDATE_RESULT_POISSON'
export const UPDATE_INPUT_FORM_1 = 'counter/UPDATE_INPUT_FORM_1'
export const UPDATE_INPUT_FORM_2 = 'counter/UPDATE_INPUT_FORM_2'
export const UPDATE_RESULT_CUMULATIVE_POISSON = 'counter/UPDATE_RESULT_CUMULATIVE_POISSON'

const initialState = {
    result_poisson: 0,
    result_cumulative_poisson:0,
    inputForm1: null,
    inputForm2: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_RESULT_POISSON: 
      return {
          ...state,
          result_poisson: action.payload
      }
    case UPDATE_INPUT_FORM_1:
        return {
            ...state,
            inputForm1: action.payload
        }
    case UPDATE_INPUT_FORM_2:
        return {
            ...state,
            inputForm2: action.payload
        }
    case UPDATE_RESULT_CUMULATIVE_POISSON:
        return {
            ...state,
            result_cumulative_poisson: action.payload
        }
    default:
      return state
  }
}

export const actionUpdateResultPoisson = (paramOne) => {
    return dispatch => {
        dispatch({
            type: UPDATE_RESULT_POISSON,
            payload: paramOne
    })
}
}
export const actionUpdateInputForm1 = (paramOne) => {
    console.log(">>>> ", paramOne)
    return dispatch => {
        dispatch({
            type: UPDATE_INPUT_FORM_1,
            payload: paramOne
        })
    }
}
export const actionUpdateInputForm2 = (paramOne) => {
    return dispatch => {
        dispatch({
            type: UPDATE_INPUT_FORM_2,
            payload: paramOne
        })
    }
}
export const actionUpdateResultCumulativePoisson = (paramOne) => {
    return dispatch => {
        dispatch({
            type: UPDATE_RESULT_CUMULATIVE_POISSON,
            payload: paramOne
    })
}
}