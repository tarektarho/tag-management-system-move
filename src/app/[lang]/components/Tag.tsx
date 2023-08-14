"use client"
import { ITag } from "../../../types/tags"
import { FormEventHandler, useEffect, useState } from "react"
import { FiEdit, FiTrash2 } from "react-icons/fi"
import { useRouter } from "next/navigation"
import Modal from "./Modal"
import { deleteTag, editTag } from "@/api/api"
import { formatISODateToHumanReadable, getCurrentISODate } from "../../../utils/index"
import { IPageText } from "@/types/pageText"

interface TagProps {
  tag: ITag,
  text: IPageText['page']
}
const Tag: React.FC<TagProps> = ({ tag, text }) => {
  const router = useRouter()
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false)
  const [tagToEdit, setTagToEdit] = useState<string>(tag.name)
  const [tagEmptyError, setTagEmptyError] = useState<boolean>(false)

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    if (!tagToEdit) {
      setTagEmptyError(true)
      return
    }
    await editTag({
      id: tag.id,
      name: tagToEdit,
      deleted: false,
      updatedAt: getCurrentISODate()
    })
    setOpenModalEdit(false)
    router.refresh()
  }

  const handleDeleteTask = async (id: string) => {
    await deleteTag(id)
    setOpenModalDeleted(false)
    router.refresh()
  }

  useEffect(() => {
    if (!openModalEdit) {
      setTagEmptyError(false) // Reset tagEmptyError when modal is closed
    }
  }, [openModalEdit])

  return (
    <tr key={tag.id} style={{ height: "48px" }}>
      <td className='w-64'>{tag.name}</td>
      <td className='w-64'>{formatISODateToHumanReadable(tag.createdAt)}</td>
      <td className='w-64'>{formatISODateToHumanReadable(tag.updatedAt)}</td>
      <td className='flex gap-5'>
        <FiEdit
          data-testid="edit-icon"
          onClick={() => setOpenModalEdit(true)}
          cursor='pointer'
          className='text-sky-500'
          size={23}
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className='font-bold text-lg'>{text.tag.editTag}</h3>
            <div className='modal-action'>
              <input
                value={tagToEdit}
                onChange={(e) => setTagToEdit(e.target.value)}
                type='text'
                placeholder={text.tag.typeHere}
                className={`input input-bordered w-full ${tagEmptyError ? "border-red-600" : ""
                  }`}
              />
              <button type='submit' className='btn btn-neutral'>
                {text.tag.save}
              </button>
            </div>
            {tagEmptyError && (
              <span className="flex text-red-600">{text.erorrs.nameCannotBeEmpty}</span>
            )}
          </form>
        </Modal>
        <FiTrash2
          data-testid="delete-icon"
          onClick={() => setOpenModalDeleted(true)}
          cursor='pointer'
          className='text-rose-600'
          size={23}
        />
        <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
          <h3 className='text-lg'>
            {text.tag.deleteTagConfiramtion}
          </h3>
          <div className='modal-action'>
            <button onClick={() => handleDeleteTask(tag.id)} className='btn btn-neutral'>
              {text.tag.yes}
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  )
}

export default Tag
