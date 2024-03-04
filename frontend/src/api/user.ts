import Crud from './_crud'
import type { UserDto } from '@/dtos/UserDto'

const basePath = '/user/'
const crud = new Crud<UserDto>(basePath)

export function getUsers(): Promise<Array<UserDto>> {
  return crud.getItems()
}

export function getUser(id: number | string): Promise<UserDto> {
  return crud.getItem(id)
}

export function addUser(business: any): Promise<UserDto> {
  return crud.create(business)
}

export function updateUser(business: any): Promise<UserDto> {
  return crud.upadte(business.id, business)
}

export function removeUser(business: any): Promise<never> {
  return crud.remove(business.id)
}
