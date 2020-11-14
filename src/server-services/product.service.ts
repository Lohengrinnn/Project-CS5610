module.exports = (app) => {
  let products = [
    {
      _id: 1,
      name: 'Harry Potter I',
      type: 'book',
      price: 100,
      description: 'Harry Potter',
      address: '276 Sun Ridge Lane, San Jose, CA',
      owner: 'You know who',
      image: null,
      location: { lat: 45.4115777, lng: -73.31792759999999 },
    },
    {
      _id: 2,
      name: 'Harry Potter II',
      type: 'book',
      price: 100,
      description: 'Harry Potter',
      address: '276 Sun Ridge Lane, San Jose, CA',
      owner: 'You know who',
      image: null,
      location: { lat: 45.4115777, lng: -73.01792759999999 },
    },
    {
      _id: 3,
      name: 'Harry Potter III',
      type: 'book',
      price: 100,
      description: 'Harry Potter',
      address: '276 Sun Ridge Lane, San Jose, CA',
      owner: 'You know who',
      image: null,
      location: { lat: 37.310, lng: -121.907 },
    },
    {
      _id: 4,
      name: 'Harry Potter IV',
      type: 'book',
      price: 100,
      description: 'Harry Potter',
      address: '276 Sun Ridge Lane, San Jose, CA',
      owner: 'You know who',
      image: null,
      location: { lat: 37.549, lng: -121.911 },
    },
  ];

  const findAllProducts = (req, res) => {
    res.send(products);
  }

  const findProductsById = (req, res) => {
    const productId = req.params["pid"];
    const product = products.find(product => product._id === productId);
    res.send(product);
  }

  app.get("/products/:pid", findProductsById)
  app.get("/products", findAllProducts)
}
