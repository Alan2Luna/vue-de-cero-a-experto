<template>
    <div>
        <CustomLink 
            v-for="link in links"
            :key="links.to"
            :link="link"
        />
    </div>
</template>
<script>
import { defineAsyncComponent } from 'vue';
export default {
    data() {
        return {
            links: [
                { to: 'pokemon-home', name: 'Pokemon' },
                { to: 'pokemon-id', name: 'Por ID', id: 151 },
                { to: 'pokemon-about', name: 'About' },

                { to: 'dbz-characters', name: 'Personajes' },
                { to: 'dbz-about', name: 'DBZ-About'},

                { to: 'https://google.com', name: 'Google' }
            ]
        }
    },
    components: {
        CustomLink: defineAsyncComponent(() => import('./CustomLink.vue'))
    }
}
</script>
<style scoped>
    div {
        padding: 0 300px;
    }
    div a {
        font-weight: bold;
        color: #2c3e50;
        margin: 0 10px;
    }
    a.router-link-exact-active {
        color: green;
    }
</style>