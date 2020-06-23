const Ant = require('./ArtificialAnt');

module.exports = class Aco {

    constructor({graph, source, target, time, m, iterations, alpha, beta, delta, tf, df, r}) {

        // ACO parameters
        
        this.graph = graph;                             // graph on which the aco is applied
        this.source = graph.nodes[source];              // source node 
        this.target = target;                           // target node
        this.time = time;                               // starting time from source node
        this.m = m;                                     // number of ants OR ant factor
        this.iterations = iterations;                   // number of iterations

        this.alpha = alpha;                             // pheromon influence factor
        this.beta = beta;                               // heuristic infleunce factor
        this.delta = delta;                             // pheromone evaporation factor
        this.r = r                                      // random factor

        this.df = df;                                   // ifleunce of distance criteria
        this.tf = tf                                    // infleunce of time criteria

        this.edges = new Array();                       // array to store all edges in initialization phase
        this.visitedNodes = new Array(this.graph.nodes.length);     //arrat to store data about visited nodes in each iterations
        this.bestAnt = new Ant({graph: this.graph, source: this.source, time: this.target});                            // used to track best solution  
        this.tour = 0;                                  // tour, or current iteration


        // for visualization
        this.d3Graph = {
            nodes: [],
            links: []
        }


        // creating ants

        this.ants = [];
        for(let i = 0; i < m; i++) {
            this.ants.push(new Ant(
                {
                    graph: this.graph,
                    source: this.graph.nodes[source],
                    time: this.time
                }
                ));
            
            }
        


        // initialization phase
        
        //TODO: setting nodes to not-visited & initializing pheromons

        let transportModes = Object.keys(graph.nodes[0].adjacents[0].transportModes);

        this.graph.nodes.forEach(node => {
            node.visited = false;       // setting node to not visited

            this.d3Graph.nodes.push({id: node.id});     // add to D" for visualization

            node.adjacents.forEach(adjacent => {

                this.d3Graph.links.push(
                    {
                        source: node.id,
                        target: adjacent.id
                    }
                );

                transportModes.forEach(tm => {
                    adjacent.transportModes[tm].departs.forEach(dp =>{
                        dp.pheromone = 1;
                        this.edges.push(dp);
                    });
                });
            });
        });
        
    }

    isVisitedNode(i) {
        return this.visitedNodes[i] || false;
    }

    newTour() {
        //TODO
        this.tour++;
        this.visitedNodes = new Array(this.graph.nodes.length);
        this.ants.forEach(ant => {
            ant.reset();
        });

    }

    calculateProbabilities(ant) {
        //TODO
            
        let sum = 0;
        let adjacents = ant.current.adjacents;
        let feasibleDeparts = ant.getFeasibleDeparts();
        let probabilities = new Array(feasibleDeparts.length);

        feasibleDeparts.forEach((dp, i) => {

            // check if node has already visited this node
            if(ant.hasVisitedNode(dp.id))
                return;

            let heuristic = 1/(dp.distance*this.df + (dp.waitingTime+dp.depart.duration)*this.tf);
            probabilities[i] = Math.pow(dp.depart.pheromone, this.alpha) * Math.pow(heuristic, this.beta);

            if(!this.isVisitedNode(dp.id))
                probabilities[i] += 1;
            sum += probabilities[i];
        });

        probabilities = probabilities.map(q => q/sum);

        // console.log(probabilities);

        
        return {feasibleDeparts, probabilities, sum};

    }

    choseNextNode(ant, feasibleDeparts, probabilities) {
        //TODO

        // if(!feasibleDeparts.length)
            // return;
            
        // visit nodes randomly at first 3 iterations
        // if(this.tour < 3 && Math.random() < this.r) {
            // let randomAdjacent = Math.floor(Math.random()*(feasibleDeparts.length));
            // ant.visitNode(feasibleDeparts[randomAdjacent]);
            // return;
        // }

        let bestProbability = -1, bpIndex = -1;
        probabilities.forEach((p,i) => {
            if(bestProbability < p) {
                bpIndex = i;
                bestProbability = p;
            }
        });

        if(!feasibleDeparts.length) {
            ant.reset();
            return;
        }


        ant.visitNode(feasibleDeparts[bpIndex]);
        this.visitedNodes[feasibleDeparts[bpIndex].id] = true;
    }

    updatePheromone() {
         
        let bestAntCoef = this.bestAnt.tourDuration*this.tf+this.bestAnt.tourDistance*this.df;  // calculating best ant quefition
        let currentAntCoef;

        this.ants.forEach(ant => {

            currentAntCoef = bestAntCoef/(ant.tourDuration*this.tf+ant.tourDistance*this.df);
            ant.visitedEdges.forEach(edge => {
                
                edge.pheromone = (1-this.delta)*edge.pheromone + currentAntCoef;
                
                if(this.bestAnt === ant) {
                    edge.pheromone += edge.pheromone*0.1;
                }
            });
            
        });
        
    }

    evaporatePheromone() {
        //TODO
        this.edges.forEach(edge => {
            edge.pheromone = (1-this.delta)*edge.pheromone;
        });
    }

    updateBestAnt(ant) {
        if((ant.tourDuration < this.bestAnt.tourDuration) || (!this.bestAnt.tourDuration)) {

            this.bestAnt.tourDistance = ant.tourDistance;
            this.bestAnt.tourDuration = ant.tourDuration;
            this.bestAnt.visitedEdges.clear();
            ant.visitedEdges.forEach(e => {
                this.bestAnt.visitedEdges.add(e);
            });
            this.bestAnt.visitedNodes.clear();
            ant.visitedNodes.forEach(e => {
                this.bestAnt.visitedNodes.add(e);
            });

        }
    }

    getSolution() {

        let solution = {};
        solution.source = this.source.id;
        solution.target = this.target;
        solution.duration = this.bestAnt.tourDuration;
        solution.distance = this.bestAnt.tourDistance;

        let vn = Array.from(this.bestAnt.visitedNodes);
        let current = this.source;
        solution.itinerary = [];
        let i = 0;
        this.bestAnt.visitedEdges.forEach((e) => {
            solution.itinerary.push({
                current: vn[i],
                next: vn[i+1],
                time: e.time,
                duration: e.duration,
                vehicle: e.vehicle

            });
            i++;
        });

        return solution;
        
        

    }

    run() {

        let i = this.iterations;

        while(i--) {
            this.newTour();
            this.ants.forEach(k => {
                while(k.current.id !== this.target) {

                    let {feasibleDeparts, probabilities} = this.calculateProbabilities(k);
                    this.choseNextNode(k, feasibleDeparts, probabilities);
                }
                this.updateBestAnt(k);
            });

            this.ants.forEach(k => {
                this.updatePheromone(k);
            }); 
            this.evaporatePheromone();
        }


    }
}