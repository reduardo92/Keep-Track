const express = require('express');
const router = express.Router();
const axios = require('axios');

// @route   GET api/food
// @access  Pulic

const foodData = data =>
  data.hints.map(item => ({
    foodId: item.food.foodId,
    label: item.food.label,
    ENERC_KCAL: parseInt(item.food.nutrients.ENERC_KCAL) || 0,
    FAT: parseInt(item.food.nutrients.FAT) || 0,
    CHOCDF: parseInt(item.food.nutrients.CHOCDF) || 0,
    PROCNT: parseInt(item.food.nutrients.PROCNT) || 0,
    image: item.food.image || null,
    measures: item.measures
  }));

router.get('/', async (req, res) => {
  const { search } = req.query;
  const api_url = process.env.food_url;
  const api_id = process.env.api_id;
  const api_key = process.env.api_key;

  try {
    if (!search || search === '')
      return res.status(400).json({ msg: 'Please enter something' });

    const fetchData = await axios.get(
      `${api_url}ingr=${search}${api_id}${api_key}`
    );

    //   Remove api_id & api_key from next button
    const next_page = fetchData.data._links.next.href
      ? fetchData.data._links.next.href.replace(`${api_id}${api_key}`, '')
      : null;

    res.json({
      food: foodData(fetchData.data),
      next_page
    });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ msg: 'Sorry No food found, try again' });
  }
});

router.post('/', async (req, res) => {
  const api_url = process.env.nutrition_url;
  const api_id = process.env.api_id;
  const api_key = process.env.api_key;

  const { serving, size, foodId } = req.body;

  try {
    const ingredients = {
      ingredients: [
        {
          quantity: parseInt(serving),
          measureURI: `http://www.edamam.com/ontologies/edamam.owl#Measure_${
            size === 'Whole' ? 'unit' : size.toLowerCase()
          }`,
          foodId
        }
      ]
    };

    const fetchData = await axios.post(
      `${api_url}${api_id}${api_key}`,
      ingredients
    );

    const energy = {
      ENERC_KCAL: fetchData.data.calories,
      FAT: parseInt(fetchData.data.totalNutrients.FAT.quantity) || 0,
      CHOCDF: parseInt(fetchData.data.totalNutrients.CHOCDF.quantity) || 0,
      PROCNT: parseInt(fetchData.data.totalNutrients.PROCNT.quantity) || 0
    };

    res.json(energy);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ msg: 'Sorry No food found, try again' });
  }
});

module.exports = router;
