export const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://covid-2019.herokuapp.com'
  : 'http://localhost:8080'

export const APP_URL = process.env.NODE_ENV === 'production'
  ? 'https://covid-2019.pt'
  : 'http://localhost:3000'