module.exports = class TransportPlanning {
    constructor({walk, bus, metro, tramway}) {

        /*

        walk, bus, metro and tramway are plannings, each of theme has a distance
        and an array of departs
    
        */

        // initializing in case of an empty array is passed to the constructor

        walk = walk || [];
        bus = bus || [];
        metro = metro || [];
        tramway = tramway || [];


        // getters and setters

        this.getPlanning = () => ({
            walk: walk,
            bus: bus,                            
            metro: metro,
            tramway: tramway
        });

        this.getPlanningMixed = () => {
            
            return (
                walk.getDeparts()
                    .concat(bus.getDeparts())
                    .concat(metro.getDeparts())
                    .concat(tramway.getDeparts())
            );
        };

    }

    // methodes

    //addDepart()
}

