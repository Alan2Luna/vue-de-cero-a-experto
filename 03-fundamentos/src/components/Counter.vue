<template>
    <h2 >{{ customTitle }}</h2>
    <p>{{ counter }}<sub>2</sub> = {{ squareCounter }}</p>
    <p data-testid="counter">{{ counter }}</p>
    <div>
        <button v-on:click="increase">+1</button>
        <button v-on:click="decrease">-1</button>
    </div>
</template>
<script>
    export default {
        props: {
            title: String,
            start: {
                type: Number,
                default: 100,
                // required: true,
                validator(value) {
                    return value < 10;
                }
            }
        },
        data() {
            return {
                counter: this.start
            }
        },
        methods: {
            getSquareValue() {
                return this.counter * this.counter;
            },
            increase() {
                this.counter++;
            },
            decrease() {
                this.counter--;
            }
        },
        computed: {
            squareCounter() {
                return this.counter * this.counter;
            },
            customTitle() {
                return this.title || 'Counter'
            }
        }
    }
</script>
<style>
    button {
        background-color: #64BB87;
        border-radius: 5px;
        border: 1px solid white;
        color: white;
        cursor: pointer;
        margin: 5px;
        padding: 5px 15px;
        transition: 0.3s ease-in-out;
    }

    button:hover {
        background-color: #5aa67b;
        transition: 0.3s ease-in-out;
    }
</style>