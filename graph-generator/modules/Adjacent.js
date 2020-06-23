const TransportPlanning = require('./TransportPlanning');
const planning = require('./Planning');
const Depart = require('./Depart');

module.exports = class Adjacent {

    /*

    Adjacent instances are used inside the Nodes (adjacents[])
    each adjacent has a destination and a transport planning wich is
    a planning for the transportModes available frome the node to the adjacent

    */

    constructor({destination, transportPlanning}) {

        transportPlanning = transportPlanning || new TransportPlanning({});

        // setters and getters
        
        this.getDestination = () => destination;
        this.getTransportPlanning = () => transportPlanning;
        
    }

    /****** methodes ******/

    addPlanning(departTime, duration, price, vehicle) {
        this.getTransportPlanning()
            .getPlanning()[vehicle.getType()]
            .addDepart(departTime, duration, price, `${vehicle.getType()[0]}${vehicle.getId()}`);
    }

    

}