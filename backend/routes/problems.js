const express = require('express');
const router = express.Router();
const {
  getProblems,
  getProblemByIdHandler,
  createProblemHandler,
  updateProblemHandler,
  deleteProblemHandler,
} = require('../controllers/problems');

// Routes for problems
router.get('/', getProblems);
router.get('/:id', getProblemByIdHandler);
router.post('/', createProblemHandler);
router.put('/:id', updateProblemHandler);
router.delete('/:id', deleteProblemHandler);

module.exports = router;