import PokemonPage from "@/pages/PokemonPage.vue";
import { shallowMount, mount } from "@vue/test-utils";
import { pokemons } from "../mocks/pokemons.moch";

describe('Pokemon Component', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(PokemonPage)
    })

    it('debe de hacer match con el snapshot', () => {

    })

    it('debe de llamar mixPokemonArray al montar', () => {
        const mixPokemonArraySpy = jest.spyOn( PokemonPage.methods, 'mixPokemonArray')
        const wrapper = shallowMount(PokemonPage)
        expect(mixPokemonArraySpy).toHaveBeenCalled()
    })
    
    it('debe de hacer match con el snapshot cuando cargan los pokemon', () => {
        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })

        expect(wrapper.html()).toMatchSnapshot()
    })

    it('debe de mostrar los componentes de PokemonPicture y PokemonOptions', () => {
        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })
        const picture = wrapper.find('pokemon-picture-stub')
        const options = wrapper.find('pokemon-options-stub')
        expect(picture.exists()).toBeTruthy()
        expect(options.exists()).toBeTruthy()
        expect(picture.attributes('pokemonid')).toBe('1')
        expect(options.attributes('pokemons')).toBeTruthy()
    })

    it('pruebas con checkAnswer', async () => {
        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })
        await wrapper.vm.checkAnswer(1)
        expect(wrapper.find('h2').exists()).toBeTruthy()
        expect(wrapper.vm.showPokemon).toBeTruthy()
        expect(wrapper.find('h2').text()).toBe(`Correcto, ${pokemons[0].name}`)
        await wrapper.vm.checkAnswer(5)
        expect(wrapper.vm.message).toBe(`Oops. era ${pokemons[0].name}`)
    })
});