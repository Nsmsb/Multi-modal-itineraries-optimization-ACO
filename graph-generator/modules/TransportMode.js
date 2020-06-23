module.exports = class TransportMode {

    /*

    transport modes are used to fill the graph and also are refered to at the departs (vehicle)

    */
    constructor({id, type, line, departs}) {


        // getters and setters

        this.getId = () => id;
        this.getType = () => type;
        this.getLine = () => line;
        this.getDeparts = () => departs;
    }
}