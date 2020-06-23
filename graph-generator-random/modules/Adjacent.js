/******** requiring modules *********/
const Depart = require('./Depart');

module.exports = class {

    constructor(id) {

        this.id = id;
        this.transportModes = {
            walk: { distance: 2+Math.random()*8, departs: [] },
            bus: { distance: 2+Math.random()*8, departs: [] },
            metro: { distance: 2+Math.random()*8, departs: [] },
            tramway: { distance: 2+Math.random()*8, departs: []}
        }

    }

    addDepart({time, price, vehicle, duration, transportMode}) {
        this.transportModes[transportMode].departs.push(
            new Depart({
                time: time,
                price: price,
                duration: duration,
                vehicle: vehicle
            })
        );
    }

    AddRandomDeparts() {
        let i = Math.round(3+Math.random()*7);
        let transportModes = ["bus", "metro", "tramway"];
        while(i--) {
            let tm = transportModes[Math.floor(Math.random()*3)];
            this.addDepart({
                time: `${Math.floor(Math.random()*23)}:${Math.floor(Math.random()*60)}`,
                price: Math.random() * 5,
                duration: this.transportModes[tm].distance/60 + Math.abs(2 - Math.random() * 6),
                vehicle: `${tm[0]}${Math.round(Math.random()*20)}`,
                transportMode: tm
            });
        }
    }

}