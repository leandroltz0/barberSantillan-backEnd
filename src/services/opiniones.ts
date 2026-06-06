import { Opinion, OpinionDocument } from '../models/Opinion'

export const getAll = async (): Promise<OpinionDocument[]> => {
  return Opinion.find().sort({ createdAt: -1 })
}

export const create = async (data: {
  name: string
  stars: number
  comentary: string
}): Promise<OpinionDocument> => {
  return Opinion.create(data)
}

export const remove = async (id: string): Promise<OpinionDocument | null> => {
  return Opinion.findByIdAndDelete(id)
}
