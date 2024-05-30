const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const Tags = await Tag.findAll({include: [{model: Product}]});
    res.status(200).json(Tags);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tag =  await Tag.findByPk( req.params.id, {include: [{model: Product}]})
    if (!tag) {
      res.status(404).json({ message: 'No Tag with this id!' });
      return;
    }
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  }).then((newTag) => {
    // Send the newly created row as a JSON object
    res.json(newTag);
  })
  .catch((err) => {
    res.json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      // All the fields you can update and the data attached to the request body.
      tag_name: req.body.tag_name
    },
    {
      // Gets the tag based on the id given in the request parameters
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedTag) => {
      // Sends the updated tag as a json response
      res.json(updatedTag);
    })
    .catch((err) => res.json(err));
});

router.delete('/:id', (req, res) => {
  // delete one tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    }
  }).then((deletedTag) => {
    res.json(deletedTag);
  })
  .catch((err) => res.json(err));
});


module.exports = router;
