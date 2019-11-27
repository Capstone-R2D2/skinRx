import axios from 'axios'

const GET_RECOMMENDATIONS = 'GET_RECOMMENDATIONS'

const gotRecommendations = recommendations => ({
  type: GET_RECOMMENDATIONS,
  recommendations
})

export const getRecommendations = (userId, skinTypeId) => async dispatch => {
  try {
    const {data} = await axios.post(`http://172.16.27.201:8080/api/recommendations/${userId}`, {skinTypeId})
    dispatch(gotRecommendations(data))
  } catch (error) {
    console.log(error)
  }
}

const initialState = {
  recommendations: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_RECOMMENDATIONS:
      return {...state, recommendations: [action.recommendations]}
    default: 
      return state
  }
}
