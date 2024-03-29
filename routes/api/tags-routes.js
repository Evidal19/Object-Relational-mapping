const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include:[
      {
       model: Product,
       attributes:[ 'product_name', 'price', 'stock', 'category_id'],
       through: ProductTag,
      }
    ]
  }).then(user => {
    console.log(user);
    res.json(user)
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where:{
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['category_id', 'id', 'tag_id']
      }
    ]
  })
  .then(user => {
    if(!user){
      res.status(400).json({err: "No tag id found"});
      return;
    }
    res.json(user);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

router.post('/', (req, res) => {
  // create a new tag
Tag.create({
  tag_name: req.body.tag_name
}).then(user => res.json({message: 'Tag created', user}))
.catch(err => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    tag_name: req.body.tag_name
  },
  {
    where: {
      id: req.params.id
    }
  }).then(user => {
    if(!user){
      res.status(400).json({message: 'No tag id found'});
      return;
    }
  })
  .catch(err=> {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where:{
      id: req.params.id
    }
  })
  .then(user => {
    if(!user){
      res.status(400).json({messages: 'No tag id found'});
      return;
    }
    res.json(user);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
