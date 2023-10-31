const app = Vue.createApp({
    // template: `
    // <h1>Hola mundo</h1>
    // <p>{{ 1 + 2 }}</p>
    // `

    data() {
        return {
            title: 'Quotes',
            quote: 'I am batman',
            author: 'Bruce Wayne'
        }
    },
    methods: {
        changeQuote() {
            console.log("Change quote")
            this.author = 'Batman'
            this.capitalize()
        },
        capitalize() {
            this.quote = this.quote.toUpperCase()
        }
    }

})

app.mount('#myApp')