<template>
    <h1 v-if="!pokemon">Espere por favor...</h1>
    <div v-else>
        <h1>¿Quién es este pokémon?</h1>
        <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon"/>
        <PokemonOptions 
            :pokemons="pokemonArr" 
            @selectionPokemon="checkAnswer" />
    </div>
    <template v-if="showAnswer">
        <h2 class="fade-in">{{  message  }}</h2>
        <button @click="newGame">Nuevo juego</button>
    </template>
</template>

<script>
import PokemonPicture from '@/components/PokemonPicture'
import PokemonOptions from '@/components/PokemonOptions'
import getPokemonOptions from '@/helpers/getPokemonOptions'
import JSConfetti from 'js-confetti'

const jsConfetti = new JSConfetti()

export default {
    components: { PokemonOptions, PokemonPicture },
    data() {
        return {
            pokemonArr: [],
            pokemon: null,
            showPokemon: false,
            showAnswer: false,
            message: ''
        }
    },
    methods: {
        async mixPokemonArray() {
            this.pokemonArr = await getPokemonOptions()
            const randomInt = Math.floor(Math.random() * 4)
            this.pokemon = this.pokemonArr[randomInt]
        },
        checkAnswer(selectedId) {
            this.showPokemon = true
            this.showAnswer = true
            if(selectedId !== this.pokemon.id) {
                this.message = `Oops. era ${this.pokemon.name}`
                return
            } 
            jsConfetti.addConfetti()
            this.message = `Correcto, ${this.pokemon.name}`
        },
        newGame() {
            this.showPokemon = false
            this.showAnswer = false
            this.pokemonArr = []
            this.pokemon = null
            this.mixPokemonArray()
        }
    },
    mounted() {
        this.mixPokemonArray()
    }
}
</script>