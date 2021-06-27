const followingReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_FOLLOWING':
      return [...state, action.data]
    default:
      return state
  }
}

export const addFollowing = (user) => {
  return async dispatch => {
    dispatch({
      type: 'ADD_FOLLOWING',
      data: user
    })
  }
}

export default followingReducer