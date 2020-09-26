const express = require('express');
const router = express.Router();
const randomcolor = require('randomcolor');

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});

const Chart = require('../models/Chart');


router.get('/chart', async(req, res) => {
  const charts = await Chart.find({});
  
  res.status(200).json(charts);
});

router.post('/chartCreate',urlencodedParser,  async(req, res) => {
  let newColor = randomcolor({
    format: 'rgba',
    alpha: 0.2
  });
  
  const postData = {
    label: req.body.label,
    data: req.body.data,
    backgroundColor: newColor,
    borderColor: newColor.replace('0.2', '1')
  };
  const chart = new Chart(postData);
  await chart.save();
  res.status(200).redirect('/');
});

router.post('/chartDelete', urlencodedParser, async (req, res) => {
  await Chart.findOneAndDelete( {label: req.body.label} );
  
  res.status(200).redirect('/');
});

router.post('/chartDeleteAll', async(req, res) => {
  await Chart.deleteMany({});
  
  res.status(200).redirect('/');
});

router.post('/chartUpdateOne', urlencodedParser, async(req, res) => {
  try {
    const chart = await Chart.findOne({label: req.body.label});
    
    if (!chart) return res.status(404).send('График не найден');
    
    let newData = req.body.data.split(' ');
    let oldData = chart.data.split(' ');
    oldData[newData[0] - 1] = newData[1];
    let updData = oldData.join(' ');
    
    chart['data'] = updData;
    await chart.save();
    res.status(200).redirect('/');
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/chartUpdate', urlencodedParser, async(req, res) => {
  try {
    const chart = await Chart.findOne({label: req.body.label});
    
    if (!chart) return res.status(404).send('График не найден');
    
    chart['data'] = req.body.data;
    await chart.save();
    res.status(200).redirect('/');
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;