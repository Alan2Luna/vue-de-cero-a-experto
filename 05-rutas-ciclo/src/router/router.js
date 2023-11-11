import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    { 
        path: '/home',
        name: 'home',
        component: () => import('@/modules/pokemon/pages/ListPage.vue') 
    },
    { 
        path: '/about', 
        component: () => import('@/modules/pokemon/pages/AboutPage.vue') 
    },
    { 
        path: '/pokemonid/:id', 
        name: 'pokemon-id',
        component: () => import('@/modules/pokemon/pages/PokemonPage.vue'),
        props: (route) => {
            const id = Number(route.params.id)
            return isNaN(id)
                ? { id: 1 }
                : { id }
        }
    },
    { 
        path: '/:pathMatch(.*)*', 
        component: () => import('@/modules/shared/pages/NoPageFound.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router