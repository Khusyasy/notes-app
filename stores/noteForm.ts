type Note = {
  id: number;
  title: string;
  content: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

type NoteFormStore = {
  note: Note | null,
  form: {
    title: string;
    content: string;
  }
  loading: boolean;
  error: string;
}

export const useNoteFormStore = defineStore('noteFormStore', {
  state: (): NoteFormStore => ({
    note: null,
    form: {
      title: '',
      content: '',
    },
    loading: false,
    error: '',
  }),
  actions: {
    async save() {
      if (!this.form.title && !this.form.content) {
        this.error = 'Title or content are required'
        return
      }
      if (this.note
        && (this.note.title === this.form.title)
        && (this.note.content === this.form.content)) {
        return
      }

      this.loading = true
      if (!this.note) {       // new note
        const response = await $fetch('/api/note', {
          method: 'POST',
          body: {
            title: this.form.title,
            content: this.form.content,
          },
        })
        if (response.status === 'success') {
          this.note = {
            id: response.data.id,
            title: response.data.title,
            content: response.data.content,
            userId: response.data.userId,
            createdAt: new Date(response.data.createdAt),
            updatedAt: new Date(response.data.updatedAt),
          }
        } else {
          this.error = response.data.error
        }
      } else {              // update note
        const response = await $fetch(`/api/note/${this.note.id}`, {
          method: 'PUT',
          body: {
            title: this.form.title,
            content: this.form.content,
          },
        })
        if (response.status === 'success') {
          this.note.title = response.data.title
          this.note.content = response.data.content
          this.note.updatedAt = new Date(response.data.updatedAt)
        } else {
          this.error = response.data.error
        }
      }
      this.loading = false
    },
    changeNote(note: Note) {
      this.note = note
      this.form.title = note.title
      this.form.content = note.content
      this.loading = false
      this.error = ''
    },
    reset() {
      this.note = null
      this.form.title = ''
      this.form.content = ''
      this.loading = false
      this.error = ''
    }
    // TODO: undo redo manager
  }
})
