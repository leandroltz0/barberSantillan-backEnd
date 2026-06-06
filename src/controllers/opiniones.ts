import { Request, Response } from 'express'
import * as opinionService from '../services/opiniones'

export const getAll = async (_req: Request, res: Response): Promise<void> => {
  try {
    const opiniones = await opinionService.getAll()
    res.json(opiniones)
  } catch {
    res.status(500).json({ error: 'Error al obtener opiniones' })
  }
}

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, stars, comentary } = req.body

    if (!name || typeof name !== 'string' || name.trim().length === 0 || name.length > 50) {
      res.status(400).json({ error: 'name es requerido y debe tener máximo 50 caracteres' })
      return
    }

    if (!Number.isInteger(stars) || stars < 1 || stars > 5) {
      res.status(400).json({ error: 'stars debe ser un número entero entre 1 y 5' })
      return
    }

    if (!comentary || typeof comentary !== 'string' || comentary.trim().length === 0 || comentary.length > 500) {
      res.status(400).json({ error: 'comentary es requerido y debe tener máximo 500 caracteres' })
      return
    }

    const opinion = await opinionService.create({
      name: name.trim(),
      stars,
      comentary: comentary.trim(),
    })

    res.status(201).json(opinion)
  } catch {
    res.status(500).json({ error: 'Error al crear opinión' })
  }
}

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const secret = req.headers['x-admin-secret']

    if (!secret || secret !== process.env.ADMIN_SECRET) {
      res.status(401).json({ error: 'No autorizado' })
      return
    }

    const opinion = await opinionService.remove(req.params.id)

    if (!opinion) {
      res.status(404).json({ error: 'Opinión no encontrada' })
      return
    }

    res.json({ message: 'Opinión eliminada correctamente' })
  } catch {
    res.status(500).json({ error: 'Error al eliminar opinión' })
  }
}
