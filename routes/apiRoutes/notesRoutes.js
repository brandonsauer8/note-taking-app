const router = require("express").Router();
const {
  filterByQuery,
  findById,
  createNote,
  validateNote,
  deleteNote,
} = require("../../lib/notes");
const { notes } = require("../../db/db.json");

// GET functions to get notes
router.get("/notes", (req, res) => {
  let results = notes;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

router.get("/notes/:id", (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

// POST functions to post notes
router.post("/notes", (req, res) => {
  req.body.id = notes.length.toString();
  if (!validateNote(req.body)) {
    res.status(400).send("The note is not correctly. Please try again.");
  } else {
    const note = createNote(req.body, notes);
    res.json(note);
  }
});

module.exports = router;
