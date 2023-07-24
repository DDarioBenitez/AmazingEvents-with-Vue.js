console.log("hola");

const { createApp } = Vue;

const cards = createApp({
    data() {
        return {
            eventsPast: [],
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
                this.eventsPast = data.events.filter(event => event.date < this.currentDate)
                console.log(this.eventsPast);
                this.categorys = Array.from(
                    new Set(this.eventsPast.map((event) => event.category))
                );
                this.eventChecked = this.eventsPast
            })
            .catch(error => console.log("error"));
    },
    methods: {
        // filter() {
        //     this.eventChecked = this.eventsPast.filter(event => {
        //         return event.name.toLowerCase().includes(this.search.toLowerCase()) && (this.categoryChecked.includes(event.category) || this.categoryChecked == 0)
        //     })
        //     this.eventSearch = this.eventsPast.filter(event => event.name.toLowerCase().includes(this.search.toLowerCase()));
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
            this.eventChecked = this.eventsPast.filter(event => {
                return event.name.toLowerCase().includes(this.search.toLowerCase()) && (this.categoryChecked.includes(event.category) || this.categoryChecked == 0)
            })
        }
    }
});

cards.mount('#main')
