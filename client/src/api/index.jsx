import axios from 'axios';

const API = axios.create({ 
  withCredentials: true,
  baseURL: "http://localhost:8900" 
});


export const getEvents = () => API.get("/events");
export const getEvent = (idEvent) => API.get(`/events/${idEvent}`);
export const createEvent = (event) => API.post("/events", event);
export const updateEvent = (idEvent, event) => API.post(`/events/${idEvent}`, event);
export const deleteEvent = (idEvent) => API.delete(`/events/${idEvent}`);

export const getUser = (idUser) => API.get(`/user/${idUser}`);
export const loginUser = (formData) => API.post('/user/login', formData);
export const registerUser = (formData) => API.post('/user/register', formData);