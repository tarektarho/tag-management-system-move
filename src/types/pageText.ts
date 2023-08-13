export interface IPageText {
  page: {
    tag: {
      addNewTag: string
      failedToAddNewTag: string | undefined
      editTag: string
      deleteTagConfiramtion: string
      save: string
      yes: string
      typeHere: string
    }
    addTag: {
      addNewTag: string
      save: string
      failedToAddNewTag: string
      typeHere: string
    }
    tagList: {
      createdAt: string
      actions: string
      rowsPerPage: string
      total: string
    }
  }
}
