import axios from 'axios'
import apiUrl from '../apiConfig'

export const indexGames = () => {
  return axios({
    method: 'GET',
    url: `${apiUrl}/games/`
  })
}

export const createGame = (gameData) => {
  return axios({
    method: 'POST',
    url: `${apiUrl}/games/`,
    data: gameData
  })
}

export const showGame = (gameId) => {
  return axios({
    method: 'GET',
    url: `${apiUrl}/games/${gameId}/`
  })
}

export const updateGame = (gameId, gameData) => {
  return axios({
    method: 'PATCH',
    url: `${apiUrl}/games/${gameId}/`,
    data: gameData
  })
}

export const deleteGame = (gameId) => {
  return axios({
    method: 'DELETE',
    url: `${apiUrl}/games/${gameId}/`
  })
}
