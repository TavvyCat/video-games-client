import axios from 'axios'
import apiUrl from '../apiConfig'

export const indexReviews = () => {
  return axios({
    method: 'GET',
    url: `${apiUrl}/reviews/`
  })
}

export const createReview = (reviewData, token) => {
  return axios({
    method: 'POST',
    url: `${apiUrl}/reviews/`,
    data: reviewData,
    headers: {
      Authorization: `Token ${token}`
    }
  })
}

export const showReview = (reviewId, token) => {
  return axios({
    method: 'GET',
    url: `${apiUrl}/reviews/${reviewId}/`,
    headers: {
      Authorization: `Token ${token}`
    }
  })
}

export const updateReview = (reviewId, reviewData, token) => {
  return axios({
    method: 'PATCH',
    url: `${apiUrl}/reviews/${reviewId}/`,
    data: reviewData,
    headers: {
      Authorization: `Token ${token}`
    }
  })
}

export const deleteReview = (reviewId, token) => {
  return axios({
    method: 'DELETE',
    url: `${apiUrl}/reviews/${reviewId}/`,
    headers: {
      Authorization: `Token ${token}`
    }
  })
}
