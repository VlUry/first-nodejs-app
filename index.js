const yargs = require("yargs");
const pkg = require("./package.json");

const { addNote, printNotes } = require("./notes.controller");

yargs.version(pkg.version);

yargs.command({
  command: "add",
  describe: "Add new note to list",
  builder: {
    title: {
      type: "string",
      desctiption: "Title of new note",
      demandOption: true,
    },
  },
  handler({ title }) {
    addNote(title);
  },
});

yargs.command({
  command: "list",
  describe: "Print all notes",
  handler() {
    printNotes();
  },
});

yargs.parse();
