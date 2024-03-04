import type { PersonDto } from '@/dtos/PersonDto'
import Crud from './_crud'

const basePath = '/people/'
const crud = new Crud<PersonDto>(basePath)

export function getPeople(): Promise<PersonDto[]> {
  return crud.getItems()
}

export function getPerson(id: number | string): Promise<PersonDto> {
  return crud.getItem(id)
}

export function addPerson(person: PersonDto): Promise<PersonDto> {
  return crud.create(person)
}

export function updatePerson(person: PersonDto): Promise<PersonDto> {
  return crud.upadte(person.id, person)
}

export function removePerson(person: PersonDto): Promise<void> {
  return crud.remove(person.id)
}
