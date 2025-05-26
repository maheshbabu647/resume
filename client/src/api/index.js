import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api'

const apiSever = axios.create({
    baseURL : API_BASE_URL,
    headers : {
        'Content-Type' : 'application/json',
    },
    withCredentials : true
})

export default apiSever


// apiClient.interceptors.response.use(
//     (response) => {
//       return response;
//     },
//     (error) => {
//       if (error.response && error.response.status === 401) {
//         // Unauthorized - Cookie might be invalid or missing
//         console.error("API Error 401: Unauthorized (Cookie likely invalid/missing).");
//         // Trigger logout or state clear if AuthContext is available
//         // Since we can't directly call context here easily,
//         // maybe dispatch a global event or rely on components checking auth state.
//         // Forcing a reload to login might be simplest if context isn't accessible.
//         // Check if we are NOT already on the login page to prevent redirect loop
//         if (window.location.pathname !== '/login') {
//             // Clear any lingering local user info just in case
//              localStorage.removeItem('userInfo');
//              window.location.href = '/login'; // Force reload
//         }
//       }
//       return Promise.reject(error);
//     }
//   );