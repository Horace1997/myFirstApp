import {
    ADD,
  } from '../constants/getUserInfo'
  
  export const add = () => {
    return {
      type: ADD
    }
  }
  
  // 异步的 action
  export function asyncAdd () {
    return dispatch => {
        dispatch(add())
    }
  }