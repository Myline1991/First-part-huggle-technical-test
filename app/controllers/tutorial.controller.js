const db = require("../models");
const Tutorial = db.tutorials;

// Create and Save a new Tutorial -- create() function
exports.create = (req, res) => {
 // Validation de la requête
 if (!req.body.title) {
   res.status(400).send({ message: "Content cannot be empty! "});
   return;
 }
 // Création du tutoriel
 const tutorial = new Tutorial({
   title: req.body.title,
   description: req.body.description,
   published: req.body.published ? req.body.published : false
 });
 // Sauvegarde du tutoriel en base de données
 tutorial
 .save(tutorial)
 .then(data => {
   res.send(data);
 })
 .catch(err => {
   res.status(500).send({
     message:
      err.message || "Some error occurred while creating the Tutorial."
   });
 });
};

// Retrieve all Tutorials from the database - Utilisation de la fonction findAll() pour récupérer tous les tutotiels de la base de données.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } :
  Tutorial.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single Tutorial with an id -- Utilisation de la  fonction findOne() pour récupérer un tutoriel
exports.findOne = (req, res) => {
  const id = req.params.id;
  Tutorial.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Tutorial with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
      .status(500)
      .send({message: "Error retrieving Tutorial with id= " + id });
    });
};

// Update a Tutorial by the id in the request -- Modifier une information d'un tutotiel avec la fonction update() et findByIdAndUpdate()
exports.update = (req, res) => {
  if (!req.body) {
  return res.status(400).send({
    message: "Data to update can not be empty!"
  });
}
  const id = req.params.id;
  Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
    } else res.send({ message: "Tutorial was updated successfully." });
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating Tutorial with id=" + id
    });
  });
};


// Delete a Tutorial with the specified id in the request -- Annuler un tutoriel avec la fonction delete()
exports.delete = (req, res) => {
  const id = req.params.id;
  Tutorial.findByIdAndRemove(id)
   .then(data => {
     if (!data) {
       res.status(404).send({
         message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
       });
     } else {
       res.send({
         message: "Tutorial was deleted successfully!"
       });
     }
   })
   .catch(err => {
     res.status(500).send({
       message: "Could not delete Tutorial with id=" + id
     });
   });
};

// Delete all Tutorials from the database. -- Annuler tous les tutoriels avec la fonction deleteAll()
exports.deleteAll = (req, res) => {
  Tutorial.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Tutorials were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// Find all published Tutorials -- fonction findAllPublished() pour récupérer tous les tutoriels publiés
exports.findAllPublished = (req, res) => {
  Tutorial.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
