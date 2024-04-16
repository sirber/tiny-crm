import type { Business } from '@/types/Business'
import Crud from '../crud'

const basePath = '/business/'
const crud = new Crud<Business>(basePath)

export function getBusinesses(): Promise<Business[]> {
  return crud.getItems()
}

export function getBusiness(id: number | string): Promise<Business> {
  return crud.getItem(id)
}

export function addBusiness(business: any): Promise<Business> {
  return crud.create(business)
}

export function updateBusiness(business: any): Promise<Business> {
  return crud.upadte(business.id, business)
}

export function removeBusiness(business: any): Promise<void> {
  return crud.remove(business.id)
}
