import { Schema, model, Document } from 'mongoose'
import { IOpinion } from '../types'

export interface OpinionDocument extends IOpinion, Document {}

const opinionSchema = new Schema<OpinionDocument>({
  name: {
    type: String,
    required: true,
    maxlength: 10,
  },
  stars: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comentary: {
    type: String,
    required: true,
    maxlength: 200,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export const Opinion = model<OpinionDocument>('Opinion', opinionSchema)
