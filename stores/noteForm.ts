type NoteFormStore = {
  id?: string;
  title: string;
  content: string;
}

export const useNoteFormStore = defineStore('noteFormStore', {
  state: (): NoteFormStore => ({
    id: undefined,
    title: '',
    content: '',
  }),
  actions: {
    // TODO: save and auto save (based on time or content change)
    // TODO: undo redo manager
  }
})
