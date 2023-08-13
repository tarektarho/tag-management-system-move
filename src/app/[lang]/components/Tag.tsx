"use client"
import { ITag } from "../../../types/tags"
import { FormEventHandler, useState } from "react"
import { FiEdit, FiTrash2 } from "react-icons/fi"
import { useRouter } from "next/navigation"
import Modal from "./Modal"
import { deleteTag, editTag } from "@/api/api"
import { formatISODateToHumanReadable } from '../../../utils/index'
import { IPageText } from "@/types/pageText"

interface TagProps {
  tag: ITag,
  text: IPageText['page']['tag']
}
const Tag: React.FC<TagProps> = ({ tag, text }) => {
  const router = useRouter()
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false)
  const [tagToEdit, setTagToEdit] = useState<string>(tag.name)

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    await editTag({
      id: tag.id,
      name: tagToEdit,
      deleted: false,
      updatedAt: new Date().toISOString()
    })
    setOpenModalEdit(false)
    router.refresh()
  }

  const handleDeleteTask = async (id: string) => {
    await deleteTag(id)
    setOpenModalDeleted(false)
    router.refresh()
  }

  return (
    <tr key={tag.id}>
      <td className='w-64'>{tag.name}</td>
      <td className='w-64'>{formatISODateToHumanReadable(tag.createdAt)}</td>
      <td className='w-64'>{formatISODateToHumanReadable(tag.updatedAt)}</td>
      <td className='flex gap-5'>
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          cursor='pointer'
          className='text-sky-500'
          size={23}
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className='font-bold text-lg'>{text.editTag}</h3>
            <div className='modal-action'>
              <input
                value={tagToEdit}
                onChange={(e) => setTagToEdit(e.target.value)}
                type='text'
                placeholder={text.typeHere}
                className='input input-bordered w-full'
              />
              <button type='submit' className='btn btn-neutral'>
                {text.save}
              </button>
            </div>
          </form>
        </Modal>
        <FiTrash2
          onClick={() => setOpenModalDeleted(true)}
          cursor='pointer'
          className='text-rose-600'
          size={23}
        />
        <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
          <h3 className='text-lg'>
            {text.deleteTagConfiramtion}
          </h3>
          <div className='modal-action'>
            <button onClick={() => handleDeleteTask(tag.id)} className='btn btn-neutral'>
              {text.yes}
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  )
}

export default Tag
