const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();

  if (notes.length) {
    console.log(chalk.blue("Here is the list of notes:"));
    for (i = 0; i < notes.length; i++) {
      console.log(chalk.blueBright(`${notes[i].id} ${notes[i].title}`));
    }
  } else {
    console.log(chalk.blue("There are no notes in the list."));
  }
}

async function addNote(title) {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);
  await fs.writeFile(notesPath, JSON.stringify(notes));

  console.log(chalk.green("Note was added."));
}

async function removeNote(id) {
  const notes = await getNotes();

  if (notes.find((note) => note.id === id)) {
    const filteredNotes = notes.filter((note) => note.id !== id);
    await fs.writeFile(notesPath, JSON.stringify(filteredNotes));

    console.log(chalk.red("Note was deleted."));
  } else {
    console.log(chalk.red(`There is no note with id ${id} in the list.`));
  }
}

module.exports = { addNote, removeNote, printNotes };
