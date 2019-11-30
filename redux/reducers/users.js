import axios from 'axios'

const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const ADD_SKIN_TYPE = 'ADD_SKIN_TYPE'

const initialState = {
  user: {}
}

const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER, user: {}})

export const me = (email) => async dispatch => {
  try {
    const res = await axios.get(`https://skinrx-server.herokuapp.com/auth/${email}`);
    dispatch(getUser(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const auth = (email, password) => async dispatch => {
  try {
    const res = await axios.post(`https://skinrx-server.herokuapp.com/auth/login`, {email, password})
    if (res.request.response === 'Wrong username and/or password') {
      dispatch(getUser(res.request.response))
    } else {
      dispatch(getUser(res.data))
    }
  } catch (authError) {
    console.error(authError)
  }
}

export const signUp = (firstName, lastName, email, password) => async dispatch => {
  try {
    const res = await axios.post(`https://skinrx-server.herokuapp.com/auth/signup`, {
      firstName: firstName, 
      lastName: lastName, 
      email: email, 
      password: password
    })
    dispatch(getUser(res.data))
  } catch (authError) {
    console.error(authError)
  }
}

export const updateUserProfile = (id, firstName, lastName, email) => async dispatch => {
  try {
    const res = await axios.put(`https://skinrx-server.herokuapp.com/auth/${id}`, {firstName, lastName, email})
    dispatch(getUser(res.data))
  } catch(error) {
    console.error(error)
  }
}

export const addSkinType = (userId, result) => async dispatch => {
  try {
    const res = await axios.put(`https://skinrx-server.herokuapp.com/auth/users/${userId}`, {result});
    dispatch(getUser(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const logout = () => async dispatch => {
  try {
    dispatch(removeUser())
  } catch (error) {
    console.log(error)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {...state, user: action.user}
    case REMOVE_USER:
      return {...state, user: action.user}
    default:
      return state
  }
}
