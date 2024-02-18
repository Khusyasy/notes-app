type NoteFormStore = {
  id?: number;
  title: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
  loading: boolean;
  error: string;
}

export const useNoteFormStore = defineStore('noteFormStore', {
  state: (): NoteFormStore => ({
    title: '',
    content: '',
    loading: false,
    error: '',
  }),
  actions: {
    async save() {
      this.loading = true
      if (!this.id) {       // new note
        const response = await $fetch('/api/note', {
          method: 'POST',
          body: {
            title: this.title,
            content: this.content,
          },
        })
        if (response.status === 'success') {
          this.id = response.data.id
          this.createdAt = new Date(response.data.createdAt)
          this.updatedAt = new Date(response.data.updatedAt)
        } else {
          this.error = response.data.error
        }
      } else {              // update note
        const response = await $fetch(`/api/note/${this.id}`, {
          method: 'PUT',
          body: {
            title: this.title,
            content: this.content,
          },
        })
        if (response.status === 'success') {
          this.updatedAt = new Date(response.data.updatedAt)
        } else {
          this.error = response.data.error
        }
      }
      this.loading = false
    },
    changeNote(note: Required<Omit<NoteFormStore, "loading" | "error">>) {
      this.id = note.id
      this.title = note.title
      this.content = note.content
      this.createdAt = note.createdAt
      this.updatedAt = note.updatedAt
      this.loading = false
      this.error = ''
    },
    reset() {
      this.id = undefined
      this.title = ''
      this.content = ''
      this.createdAt = undefined
      this.updatedAt = undefined
      this.loading = false
      this.error = ''
    }
    // TODO: undo redo manager
  }
})
