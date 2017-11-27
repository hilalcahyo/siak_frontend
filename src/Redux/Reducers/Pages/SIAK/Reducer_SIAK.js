export const UPDATE_LIST_ACCOUNTS = 'counter/UPDATE_LIST_ACCOUNTS'
export const UPDATE_LIST_DETAILS = 'counter/UPDATE_LIST_DETAILS'

const initialState = {
    global_state_list_account: '',
    global_state_list_details: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LIST_ACCOUNTS: 
        return {
            ...state,
            global_state_list_account: action.payload
        }
    case UPDATE_LIST_DETAILS: 
        return {
            ...state,
            global_state_list_account: action.payload
        }
    default:
      return state
  }
}

export const actionUpdateListAccount = (paramOne) => {
    return dispatch => {
            dispatch({
                type: UPDATE_LIST_ACCOUNTS,
                payload: paramOne
        })
    }
}
export const actionUpdateListDetail = (paramOne) => {
    return dispatch => {
            dispatch({
                type: UPDATE_LIST_DETAILS,
                payload: paramOne
        })
    }
}
