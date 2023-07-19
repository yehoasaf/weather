import { Weather } from './pages/Weather.jsx'
import { Favorites } from './pages/Favorites.jsx'

export const routes = [{
        path: '/',
        component: Weather,
    },
    {
        path: '/favorites',
        component: Favorites
    }
]