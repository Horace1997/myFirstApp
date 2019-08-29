import { ADD } from '../constants/getUserInfo'

const INITIAL_STATE = {
    nickName:"",
    avatarUrl:"",
}

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        ...action
      }
    default:
      return state
  }
}