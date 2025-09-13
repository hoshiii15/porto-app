import axios from 'axios'

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
})

// Add token to requests if available
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token')
    if (token) {
        req.headers.Authorization = `Bearer ${token}`
    }
    return req
})

// Auth APIs
export const login = (formData) => API.post('/auth/login', formData)
export const register = (formData) => API.post('/auth/register', formData)

// Profile APIs
export const getProfile = () => API.get('/profile')
export const updateProfile = (profileData) => API.put('/profile', profileData)

// Project APIs
export const getProjects = () => API.get('/projects')
export const createProject = (projectData) => API.post('/projects', projectData)
export const updateProject = (id, projectData) => API.put(`/projects/${id}`, projectData)
export const deleteProject = (id) => API.delete(`/projects/${id}`)

// Social Links APIs
export const getSocialLinks = () => API.get('/social-links')
export const createSocialLink = (socialLinkData) => API.post('/social-links', socialLinkData)
export const updateSocialLink = (id, socialLinkData) => API.put(`/social-links/${id}`, socialLinkData)
export const deleteSocialLink = (id) => API.delete(`/social-links/${id}`)

export default API
