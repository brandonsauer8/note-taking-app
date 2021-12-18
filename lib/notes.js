const fs = require("fs");
const path = require("path");

function filterByQuery(query, notesArray) {
  let filteredResults = notesArray;
  if (query.title) {
    filteredResults = filteredResults.filter(
      (note) => note.title === query.title
    );
  }
  return filteredResults;
}

function findById(id, notesArray) {
  const result = notesArray.filter((note) => note.id === id)[0];
  return result;
}

//creates a note
function createNote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  return note;
}
//validates the note to make sure the user enters the note correclty.
function validateNote(note) {
  if (!note.title || typeof note.title !== "string") {
    return false;
  }
  return true;
}

module.exports = {
  filterByQuery,
  findById,
  createNote,
  validateNote,
};
