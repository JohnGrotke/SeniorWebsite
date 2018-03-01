var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/resume', function(req, res, next) {
  res.render('resume');
});

router.get('/projects', function(req, res, next) {
  res.render('projects');
});

router.get('/fun', function(req, res, next) {
  res.render('fun');
});

module.exports = router;
