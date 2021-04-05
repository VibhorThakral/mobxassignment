import {action, computed, makeObservable, observable} from 'mobx';

class NotesStore {
  constructor() {
    makeObservable(this, {
      notes: observable,
      addNote: action,
      updateNote: action,
      getNote: action,
      removeNote: action,
      getAllNotes: computed,
    });
  }
  notes = [
    {
      id: 1,
      title: 'Title 1',
      body: 'Body 1',
    },
    {
      id: 2,
      title: 'Title 2',
      body: 'Body 2',
    },
    {
      id: 3,
      title: 'Title 3',
      body: 'Body 3',
    },
  ];

  addNote(title, body) {
    const id = this.notes.length + 1;
    return (this.notes = [...this.notes, {id, title, body}]);
  }

  updateNote(id, title, body) {
    const newNotes = this.notes.map(ele =>
      ele.id === id ? {id, title, body} : ele,
    );
    return (this.notes = newNotes);
  }

  getNote(id) {
    return this.notes.find(ele => ele.id === id);
  }

  removeNote(id) {
    return (this.notes = this.notes.filter(note => note.id !== id));
  }

  get getAllNotes() {
    return this.notes;
  }
}

export default new NotesStore();
