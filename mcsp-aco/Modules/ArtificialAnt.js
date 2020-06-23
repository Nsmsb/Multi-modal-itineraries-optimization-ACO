/***** requiring modules goes here *****/


module.exports = class ArtificialAnts {
    
    constructor({graph, source, time}) {

        this.graph = graph
        this.source = source;
        this.current = source;
        this.time = time;
        this.currentTime = time;
        //this.tour = 0;
        this.tourDistance = 0;
        this.tourDuration = 0;
        this.visitedNodes = new Set([this.source.id]);
        this.visitedEdges = new Set();
    }

    reset() {
        this.current = this.source;
        this.currentTime = this.time;
        this.visitedNodes.clear()
        this.visitedNodes.add(this.source.id);
        this.visitedEdges.clear();
        //this.tour++;
        this.tourDistance = 0;
        this.tourDuration = 0;
    }

    hasVisitedNode(node) {
        return this.visitedNodes.has(node);
    }

    visitNode(adjacent) {

        this.visitedNodes.add(adjacent.id);
        this.current = this.graph.nodes[adjacent.id];  /**************************** */
        this.visitedEdges.add(adjacent.depart);

        // calculating spentTime to arrive
        let spentTime = adjacent.waitingTime + adjacent.depart.duration;
        let [currentHour, currentMinuts] = this.currentTime.split(':').map(e => Number(e));
        
        // calculating next currentTime (arrival time)
        currentMinuts += spentTime;
        currentHour = Math.floor((currentHour+currentMinuts/60)%24);
        currentMinuts %= 60;
        
        this.currentTime = `${currentHour}:${currentMinuts}`;

        // updating tourLength & tourDuration
        this.tourDistance += adjacent.distance;
        this.tourDuration += spentTime;
    }

    getFeasibleDeparts() {
        let adjacents = this.current.adjacents;
        let transportModes = Object.keys(adjacents[0].transportModes);
        let feasibleDeparts = [];
        adjacents.forEach(adjacent => {
             transportModes.forEach(tm => {
                 adjacent.transportModes[tm].departs.forEach(dp =>{
                    //  if(this.currentTime <= dp.time) {

                        // calculating waiting time
                        let [h1,m1] = this.currentTime.split(':').map(e => Number(e));
                        let [h2,m2] = dp.time.split(':').map(e => Number(e));
                        let waitingTime = (h2-h1)*60 + (m2-m1);

                        if(waitingTime < 0)
                            waitingTime += 24*60;
                        
                        // adding a depart to feasible onces
                        feasibleDeparts.push({
                             id: adjacent.id,
                             transportMode: tm,
                             distance: adjacent.transportModes[tm].distance,
                             waitingTime: waitingTime,
                             depart: dp
                         });
                    //  }
                 })
             })
        });

        // sorting feasibleDeparts

        feasibleDeparts.sort((a, b) => {
            return a.waitingTime > b.waitingTime ? 1 : -1;
        });
        // console.log(feasibleDeparts);

        return feasibleDeparts;
    }



}