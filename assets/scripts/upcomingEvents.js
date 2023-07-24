console.log("hola");

const { createApp } = Vue;

const cards = createApp({
    data() {
        return {
            eventsFuture: [],
            currentDate: "",
            categorys: [],
            eventChecked: [],
            eventSearch: [],
            categoryChecked: [],
            search: "",
        };
    },
    created() {
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
            .then((data) => data.json())
            .then((data) => {
                this.currentDate = data.currentDate;
                this.eventsFuture = data.events.filter(event => event.date > this.currentDate)
                console.log(this.eventsFuture);
                this.categorys = Array.from(
                    new Set(this.eventsFuture.map((event) => event.category))
                );
                this.eventChecked = this.eventsFuture
            })
            .catch(error => console.log("error"));
    },
    methods: {
        // filter() {
        //     this.eventChecked = this.eventsFuture.filter(event => {
        //         return event.name.toLowerCase().includes(this.search.toLowerCase()) && (this.categoryChecked.includes(event.category) || this.categoryChecked == 0)
        //     })
        //     this.eventSearch = this.eventsFuture.filter(event => event.name.toLowerCase().includes(this.search.toLowerCase()));
        //     console.log(this.eventSearch);
        //     console.log(this.categoryChecked);
        //     if (this.categoryChecked.length > 0) {
        //         return this.eventChecked = this.eventSearch.filter(event => this.categoryChecked.includes(event.category))
        //     } else {
        //         return this.eventSearch
        //     }
        // }
    },
    computed: {
        filter() {
            this.eventChecked = this.eventsFuture.filter(event => {
                return event.name.toLowerCase().includes(this.search.toLowerCase()) && (this.categoryChecked.includes(event.category) || this.categoryChecked == 0)
            })
        }
    }

});

cards.mount('#main')
