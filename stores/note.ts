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
  loading: boolean;
  error: string;
}

export const useNoteStore = defineStore('noteStore', {
  state: (): NoteStore => ({
    notes: [],
    loading: false,
    error: 'test error',
  }),
  actions: {
    async getAll() {
      this.loading = true
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
      } else {
        this.error = response.data.error
      }
      this.loading = false
    }
  }
})
