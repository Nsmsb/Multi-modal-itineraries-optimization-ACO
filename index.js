/****** requiring modules *******/
const express = require('express');
const fs = require('fs');


const Aco = require('./mcsp-aco/Modules/Aco');
const RandomGraph = require('./graph-generator-random/modules/RandomMultimodalGraph');

// graphs

const lyonGraph = require('./mcsp-aco/lyon.json');
const lyonNodes = require('./mcsp-aco/data/tclLyon.json');
const rg = new RandomGraph({nodes: 30, generationLength: 4});
// server configs

const configs = {
    host: 'http://localhost:',
    port: 5000
};

// graph reference

let graph = rg;


const app = express();

let acoParams = {
    graph: graph, //randomGraph/*graphObject*/,
    source: 0/*14*/,
    target: lyonGraph.length-1/*20*/,
    time: '08:00',
    m: 30,
    iterations: 20,
    alpha: 0.6,
    beta: 0.4,
    delta: 0.2,
    df: 0.6,
    tf: 0.4,
    r: 0.3
};



app.get('/itinerary/:source/:target/:time/:m/:iterations', (req, res) => {

    
    acoParams.source = Number(req.params.source);
    acoParams.target = Number(req.params.target);
    acoParams.m = Number(req.params.m);
    acoParams.iterations = Number(req.params.iterations);
    

    let aco = new Aco(acoParams);
    aco.run();
    let solution = aco.getSolution();

    console.log("done");


    // changing color of source, destination and found path

    aco.d3Graph.nodes[acoParams.source].color = "#2f3542";
    aco.d3Graph.nodes[acoParams.target].color = "#009432";

    solution.itinerary.forEach(i => {
        aco.d3Graph.nodes[i.next].color = "#009432"; 
        aco.d3Graph.links.forEach(e => {
            if(i.current === e.source && i.next === e.target || i.next === e.target && i.current === e.source)
                e.color = "#009432";
        });
    });
    
    
    let data = {
        solution: solution,
        graph: aco.d3Graph
    };


    fs.writeFile('./pfe/src/components/data.json', JSON.stringify(data), function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
      

    solution.itinerary.forEach(s => {
        console.log(lyonNodes[s.current].name, "   ===>   ");
    });
    
    res.status(200)
        .send(solution);
        
});

// app.get('/:name', (req, res) => {
//     console.log(`Helo Mr. ${req.params.name}`);
// })

app.listen(configs.port, () => {
    console.log("server running on http://localhost:3000/");
});