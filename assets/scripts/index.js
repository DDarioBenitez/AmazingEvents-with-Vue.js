console.log("hola");

const { createApp } = Vue;

const cards = createApp({
    data() {
        return {
            events: [],
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
                this.events = data.events;
                this.categorys = Array.from(
                    new Set(this.events.map((event) => event.category))
                );
                this.eventChecked = data.events
            })
            .catch(error => console.log("error"));
    },
    methods: {
        filter() {
            this.eventChecked = this.events.filter(event => {
                return event.name.toLowerCase().includes(this.search.toLowerCase()) && (this.categoryChecked.includes(event.category) || this.categoryChecked == 0)
            })
            // this.eventSearch = this.events.filter(event => event.name.toLowerCase().includes(this.search.toLowerCase()));
            // console.log(this.eventSearch);
            // console.log(this.categoryChecked);
            // if (this.categoryChecked.length > 0) {
            //     return this.eventChecked = this.eventSearch.filter(event => this.categoryChecked.includes(event.category))
            // } else {
            //     return this.eventChecked = this.events
            // }
        }
    }
});

cards.mount('#main')
