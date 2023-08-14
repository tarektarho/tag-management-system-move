export interface IPageText {
  page: {
    emptyStateMessage: string,
    tag: {
      addNewTag: string
      editTag: string
      deleteTagConfiramtion: string
      save: string
      yes: string
      typeHere: string
    }
    addTag: {
      addNewTag: string
      save: string
      typeHere: string
    }
    tagList: {
      createdAt: string
      updatedAt: string
      actions: string
      rowsPerPage: string
      total: string
    },
    erorrs: {
      nameCannotBeEmpty: string
    }
  }
}
