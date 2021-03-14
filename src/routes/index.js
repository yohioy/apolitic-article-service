const { Router } = require('express');

const router = Router();

router.get('/articles', (req, res) => {
  res.status(200).json({});
});

router.get('/articles/:id', (req, res) => {
  res.status(200).json({});
});

router.get('/health', (req, res) => {
  res.status(200).json({ healthy: true });
});
module.exports = router;
