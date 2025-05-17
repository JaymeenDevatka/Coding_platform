const express = require('express');
const {
  getProblems,
  getProblemByIdHandler,
  createProblemHandler,
  updateProblemHandler,
  deleteProblemHandler,
} = require('../controllers/problems');

const router = express.Router();

router.get('/', getProblems);
router.get('/:id', getProblemByIdHandler);
router.post('/', createProblemHandler);
router.put('/:id', updateProblemHandler);
router.delete('/:id', deleteProblemHandler);

module.exports = router;