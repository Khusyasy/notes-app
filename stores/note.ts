type Note = {
  id: number;
  title: string;
  content: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

type NoteStore = {
  notes: Note[];
  // pending: boolean;
  // error: string;
}

export const useNoteStore = defineStore('noteStore', {
  state: (): NoteStore => ({
    notes: [],
  }),
  actions: {
    async getAll() {
      const response = await $fetch('/api/note')
      if (response.status === 'success') {
        this.notes = response.data.map((note) => ({
          id: note.id,
          title: note.title,
          content: note.content,
          userId: note.userId,
          createdAt: new Date(note.createdAt),
          updatedAt: new Date(note.updatedAt),
        }))
      }
      // TODO: loading / pending handling
      // TODO: error handling
    }
  }
})
