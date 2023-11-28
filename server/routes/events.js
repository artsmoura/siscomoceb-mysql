import express from 'express';
import { createEvent, deleteEvent, getEvent, getEvents, updateEvent } from '../controllers/event.js';
import { Auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', Auth, getEvents);
router.get('/:id', getEvent);
router.post('/', Auth, createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

export default router;