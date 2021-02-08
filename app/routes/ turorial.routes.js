module.exports = (app) => {
  const tutorials = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", tutorials.create);

  // Retrieve all Tutorials
  // router.get("/", tutorials.findAll);


  router
    .route("/")
    .get((req, res) => {
      tutorials
        .findAll()
        .then((currencies) => res.json(currencies).status(200))
        .catch((err) => res.status(404).json(err));
  })

  // Retrieve all published Tutorials
  router.get("/published", tutorials.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", tutorials.findOne);

  // Update a Tutorial with id
  router.put("/:id", tutorials.update);

  // Delete a Tutorial with id
  router.delete("/:id", tutorials.delete);

  // Delete all Tutorials
  router.delete("/", tutorials.deleteAll);

  app.use("/api/tutorials", router);
};
