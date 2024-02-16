type NoteFormStore = {
  id?: number;
  title: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const useNoteFormStore = defineStore('noteFormStore', {
  state: (): NoteFormStore => ({
    title: '',
    content: '',
  }),
  actions: {
    async save() {
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
        }
        // TODO: loading / pending / error handling
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
        }
        // TODO: loading / pending / error handling
      }
    },
    changeNote(note: Required<NoteFormStore>) {
      this.id = note.id
      this.title = note.title
      this.content = note.content
      this.createdAt = note.createdAt
      this.updatedAt = note.updatedAt
    },
    reset() {
      this.id = undefined
      this.title = ''
      this.content = ''
      this.createdAt = undefined
      this.updatedAt = undefined
    }
    // TODO: undo redo manager
  }
})
