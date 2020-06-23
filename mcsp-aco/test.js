let k = [
  {
    id: 2,
    transportMode: "bus",
    depart: {
      time: "08:10",
      duration: 3,
      price: 0.8421285465669781,
      vehicle: "b4"
    }
  },
  {
    id: 1,
    transportMode: "tramway",
    depart: {
      time: "08:30",
      duration: 8,
      price: 6.694408403385714,
      vehicle: "t0"
    }
  },
  {
    id: 2,
    transportMode: "bus",
    depart: {
      time: "08:15",
      duration: 3,
      price: 2.0896090004750167,
      vehicle: "b4"
    }
  }
];

let f = (e1, e2) => {
  return e1.depart.time > e2.depart.time ? 1 : -1;
};

console.log(k.sort(f));
