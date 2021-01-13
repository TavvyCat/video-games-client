import axios from 'axios'
import apiUrl from '../apiConfig'

export const createTag = (tagData, token) => {
  return axios({
    method: 'POST',
    url: `${apiUrl}/tags/`,
    data: tagData,
    headers: {
      Authorization: `Token ${token}`
    }
  })
}

export const deleteTag = (tagId, token) => {
  return axios({
    method: 'DELETE',
    url: `${apiUrl}/tags/${tagId}/`,
    headers: {
      Authorization: `Token ${token}`
    }
  })
}
