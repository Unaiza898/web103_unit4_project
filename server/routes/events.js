import express from 'express'
import EventsController from '../controllers/events.js'

const router = express.Router()
router.get('/color', EventsController.getColor) // Cars
router.get('/roof', EventsController.getRoof) // Cars
router.get('/car', EventsController.getCar) // Cars
router.get('/car:id', EventsController.getCarById) // Cars
// router.get('/color', EventsController.getColors) // Cars
// router.get('/', EventsController.getEvents)
// router.get('/location', EventsController.getLocation)
// router.get('/events/:eventId', EventsController.getEventById)
// router.get('/location/:locationId', EventsController.getEventByLocation)
router.post('/', EventsController.createCar)
router.delete('/:id', EventsController.deleteCar)
export default router