const Adjacent =  require('./Adjacent');

module.exports = class Node {
    
    constructor({id, adjacents}) {

        adjacents = adjacents || [];

        // setters and getters
        this.getAdjacents = () => adjacents;
        this.getId = () => id;

    }

    // methode to add an adjacent

    addAdjacent(id, transportPlanning) {
        this.getAdjacents().push(
            new Adjacent({
                destination: id,
                transportPlanning: transportPlanning
            })
        );
    }


    // method to get an adjacent, it takes an id and 
    // returns the adjacent if found, if not it returns -1
    
    getAdjacent(id) {

        for(let i = 0; i < this.getAdjacents().length; i++) {
            let adjacent = this.getAdjacents()[i];
            if(adjacent.getDestination() === id)
                return adjacent;
        }

        return -1;
    }

    // methode to check if a node is adjacent to the current one

    isAdjacent(id) {
        if(this.getAdjacent(id) == -1)
            return false;

        return true;
    }

}