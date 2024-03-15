import config from '../../config.json'
import { ICity } from '../types/types'
import httpService from './http.service'

const url = config.apiEndpoint + '/cities'

const citiesService = {
  fetchAllCities: async () => {
    const { data } = await httpService.get(url)
    return data
  },
  createCity: async (city: ICity) => {
    const { data } = await httpService.post(url, city)
    return data
  },
  updateCity: async (city: ICity) => {
    const { data } = await httpService.patch(url + '/updateCity', city)
    return data
  },
  deleteCity: async (city: ICity) => {
    const { data } = await httpService.delete(url + `/${city.value}`)
    return data
  },
}

export default citiesService
