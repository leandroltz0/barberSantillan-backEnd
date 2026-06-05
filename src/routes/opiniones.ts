import { Router, Request, Response } from 'express'
import { Opinion } from '../models/Opinion'

const router = Router()

router.get('/', async (_req: Request, res: Response) => {
  try {
    const opiniones = await Opinion.find().sort({ createdAt: -1 })
    res.json(opiniones)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener opiniones' })
  }
})

router.post('/', async (req: Request, res: Response) => {
  try {
    const { nombre, estrellas, texto } = req.body

    if (!nombre || typeof nombre !== 'string' || nombre.trim().length === 0 || nombre.length > 50) {
      res.status(400).json({ error: 'Nombre es requerido y debe tener máximo 50 caracteres' })
      return
    }

    if (!Number.isInteger(estrellas) || estrellas < 1 || estrellas > 5) {
      res.status(400).json({ error: 'Estrellas debe ser un número entero entre 1 y 5' })
      return
    }

    if (!texto || typeof texto !== 'string' || texto.trim().length === 0 || texto.length > 500) {
      res.status(400).json({ error: 'Texto es requerido y debe tener máximo 500 caracteres' })
      return
    }

    const opinion = await Opinion.create({
      nombre: nombre.trim(),
      estrellas,
      texto: texto.trim(),
    })

    res.status(201).json(opinion)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear opinión' })
  }
})

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const secret = req.headers['x-admin-secret']

    if (!secret || secret !== process.env.ADMIN_SECRET) {
      res.status(401).json({ error: 'No autorizado' })
      return
    }

    const opinion = await Opinion.findByIdAndDelete(req.params.id)

    if (!opinion) {
      res.status(404).json({ error: 'Opinión no encontrada' })
      return
    }

    res.json({ message: 'Opinión eliminada correctamente' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar opinión' })
  }
})

export default router
