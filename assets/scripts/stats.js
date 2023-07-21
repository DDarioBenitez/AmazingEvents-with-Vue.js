console.log("hola");

const { createApp } = Vue;

const table = createApp({
    data() {
        return {
            categorys: [],
            eventPast: [],
            eventFuture: [],
            events: [],
            currentDate: "",
            mayorPercentageA: [],
            minumPercentageA: [],
            greaterCapacity: [],
            pastStats: [],
            futureStats: []
        }
    },
    created() {
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
            .then((data) => data.json())
            .then((data) => {
                this.currentDate = data.currentDate;
                this.events = data.events
                console.log(this.events);
                this.categorys = Array.from(
                    new Set(this.events.map((event) => event.category))
                )
                this.eventPast = this.events.filter(event => event.date < this.currentDate)
                this.eventFuture = this.events.filter(event => event.date > this.currentDate)
                console.log(this.eventPast);
                console.log(this.eventFuture);
                this.mayorPercentageA = mayorA(this.eventPast)
                console.log(this.mayorPercentageA);
                this.minumPercentageA = minumA(this.eventPast)
                console.log(this.minumPercentageA);
                this.greaterCapacity = greaterC(this.events)
                console.log(this.greaterCapacity);

                let categoryPast = Array.from(new Set(this.eventPast.map(event => event.category)))
                console.log(categoryPast);
                let categoryFuture = Array.from(new Set(this.eventFuture.map(event => event.category)))
                this.pastStats = stats(categoryPast, this.eventPast)
                console.log(this.pastStats);
                this.futureStats = stats(categoryFuture, this.eventFuture)

            })
            .catch(error => console.log("error"));
    },
})
table.mount('#main')

function mayorA(events) {
    let control = 0
    let aux
    let eventSelec
    for (let event of events) {
        aux = Math.round(100 * event.assistance / event.capacity)
        if (control <= aux) {
            control = aux
            eventSelec = event.name
        }
    }
    return eventSelec = `"${eventSelec}",  ${aux} %`
}
function minumA(events) {
    let control = Math.round(100 * events[0].assistance / events[0].capacity)
    let aux
    let eventSelec
    for (let event of events) {
        aux = Math.round(100 * event.assistance / event.capacity)
        if (control >= aux) {
            control = aux
            eventSelec = event.name
        }
    }
    return eventSelec = `"${eventSelec}",  ${aux} %`
}

function greaterC(events) {
    let control = 0
    let aux
    let eventSelec
    for (let event of events) {
        aux = event.capacity
        if (control <= aux) {
            control = aux
            eventSelec = event.name
        }
    }
    return `"${eventSelec}"`
}

function stats(category, events) {
    let result = category.map(category => {
        let capacityTotal = 0
        let assistanceTotal = 0
        let objetoFinal = {
            category: category,
            revenue: 0,
            percentageOfAssitance: 0,
        }
        let categoryFilter = events.filter(event => event.category == category)
        for (let event of categoryFilter) {
            objetoFinal.revenue += event.price * (event.assistance || event.estimate)
            capacityTotal += event.capacity
            assistanceTotal += (event.assistance || event.estimate)
            objetoFinal.percentageOfAssitance = Math.round(100 * assistanceTotal / capacityTotal)
        }
        return objetoFinal
    })
    return result
}

