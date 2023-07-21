console.log("hola");

const { createApp } = Vue;

const card = createApp({
    data() {
        return {
            events: [],
            currentDate: "",
            eventRequired: {},
            estiOrAssis: ""
        };
    },
    created() {
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
            .then(data => data.json())
            .then(data => {
                this.events = data.events
                console.log(this.events)
                this.currentDate = data.currentDate
                console.log(this.currentDate)
                let eventSearch = location.search
                console.log(eventSearch)
                let eventIdSearch = new URLSearchParams(eventSearch)
                // console.log(eventIdSearch);
                let eventId = eventIdSearch.get('id')
                console.log(eventId)
                let detailsMain = document.getElementById("details-main")
                this.eventRequired = this.events.find(event => event._id == eventId)
                console.log(this.eventRequired)
                this.eventRequired.estimate ? this.estiOrAssis = "Estimate: " + this.eventRequired.estimate : this.estiOrAssis = "Assistance: " + this.eventRequired.assistance
            }).catch(error => console.log("error"))
    }
})

card.mount('#main')