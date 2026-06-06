import { Router } from 'express'
import * as opinionController from '../controllers/opiniones'

const router = Router()

router.get('/', opinionController.getAll)
router.post('/', opinionController.create)
router.delete('/:id', opinionController.remove)

export default router
