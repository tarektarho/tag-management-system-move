"use client"
import { ITag } from "../../../types/tags"
import { FormEventHandler, useEffect, useState, useRef } from "react"
import { FiEdit, FiTrash2 } from "react-icons/fi"
import { useRouter } from "next/navigation"
import Modal from "./Modal"
import { deleteTag, editTag } from "@/api/api"
import { getCurrentTimestamp } from "../../../utils/index"
import { IPageText } from "@/types/pageText"

// Define component's props interface
interface TagProps {
  tag: ITag,
  text: IPageText['page']
}
const Tag: React.FC<TagProps> = ({ tag, text }) => {
  // Router instance for navigation
  const router = useRouter()

  // State variables for modal states and form values
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false)
  const [tagToEdit, setTagToEdit] = useState<string>(tag.name)
  const [tagEmptyError, setTagEmptyError] = useState<boolean>(false)

  // Ref to store the input field element
  const inputRef = useRef<HTMLInputElement>(null)


  // Form submission handler for tag editing
  const handleSubmitEditTag: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    // Check for empty tag name
    if (!tagToEdit) {
      setTagEmptyError(true)
      return
    }
    // Update the tag and close the edit modal
    await editTag({
      id: tag.id,
      name: tagToEdit,
      deleted: false,
      updatedAt: getCurrentTimestamp()
    })
    setOpenModalEdit(false)
    router.refresh() // Refresh the component
  }

  // Delete tag handler
  const handleDeleteTag = async () => {
    // Delete the tag and close the delete modal
    await deleteTag(tag.id)
    setOpenModalDeleted(false)
    router.refresh() // Refresh the component
  }

  // Effect to reset tagEmptyError when edit modal is closed
  useEffect(() => {
    if (openModalEdit && inputRef.current) {
      // Focus on the input field when the modal opens
      inputRef.current.focus()
      // Move the cursor to the end of the input value
      inputRef.current.selectionStart = inputRef.current.value.length
      inputRef.current.selectionEnd = inputRef.current.value.length
    } else {
      setTagEmptyError(false) // Reset tagEmptyError when modal is closed
    }
  }, [openModalEdit])

  return (
    <tr key={tag.id} style={{ height: "48px" }}>
      <td className='w-64'>{tag.name}</td>
      <td className='w-64'>{tag.createdAt}</td>
      <td className='w-64'>{tag.updatedAt}</td>
      <td className='flex gap-5'>
        <FiEdit
          data-testid="edit-icon"
          onClick={() => setOpenModalEdit(true)}
          cursor='pointer'
          className='text-sky-500'
          size={23}
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTag}>
            <h3 className='font-bold text-lg'>{text.tag.editTag}</h3>
            <div className='modal-action'>
              <input
                ref={inputRef}
                value={tagToEdit}
                onChange={(e) => setTagToEdit(e.target.value)}
                type='text'
                placeholder={text.tag.typeHere}
                className={`input input-bordered w-full ${tagEmptyError ? "border-red-700" : ""
                  }`}
              />
              <button type='submit' className='btn btn-neutral'>
                {text.tag.save}
              </button>
            </div>
            {tagEmptyError && (
              <span className="flex text-red-700">{text.erorrs.nameCannotBeEmpty}</span>
            )}
          </form>
        </Modal>
        <FiTrash2
          data-testid="delete-icon"
          onClick={() => setOpenModalDeleted(true)}
          cursor='pointer'
          className='text-rose-700'
          size={23}
        />
        <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
          <h3 className='text-lg'>
            {text.tag.deleteTagConfiramtion}
          </h3>
          <div className='modal-action'>
            <button onClick={() => handleDeleteTag()} className='btn btn-neutral'>
              {text.tag.yes}
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  )
}

export default Tag
