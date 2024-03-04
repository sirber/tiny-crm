import axios from 'axios'

export default class<T> {
  basePath: string

  constructor(basePath: string) {
    this.basePath = basePath
  }

  getItems(): Promise<Array<T>> {
    return axios.get(this.basePath).then((response) => response.data)
  }

  getItem(id: number | string): Promise<T> {
    return axios.get(this.basePath + id).then((response) => response.data)
  }

  create(payload: T): Promise<T> {
    return axios.post(this.basePath, payload).then((response) => response.data)
  }

  upadte(id: string, payload: T): Promise<T> {
    return axios.put(this.basePath + id, payload).then((response) => response.data)
  }

  remove(id: string): Promise<never> {
    return axios.delete(this.basePath + id)
  }
}
