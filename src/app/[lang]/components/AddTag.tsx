"use client"
import { AiOutlinePlus } from "react-icons/ai"
import Modal from "./Modal"
import { FormEventHandler, useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { addTag } from "../../../api/api"
import { getCurrentTimestamp } from "../../../utils/index"
import { IPageText } from "../../../types/pageText"

interface AddTagProps {
  text: IPageText['page']
}

const AddTag: React.FC<AddTagProps> = ({ text }) => {
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [newTagValue, setNewTagValue] = useState<string>("")
  const [tagEmptyError, setTagEmptyError] = useState<boolean>(false)

  // Ref to store the input field element
  const inputRef = useRef<HTMLInputElement>(null)

  /**
   * Handles the form submission when adding a new tag.
   * 
   * @param {React.FormEvent<HTMLFormElement>} e - The form event object.
   */
  const handleSubmitNewTag: FormEventHandler<HTMLFormElement> = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!newTagValue) {
      setTagEmptyError(true)
      return
    }

    // Add the new tag using the API
    await addTag({
      id: '0',
      name: newTagValue,
      deleted: false,
      createdAt: getCurrentTimestamp(),
      updatedAt: getCurrentTimestamp()
    })

    // Clear the input and close the modal
    setNewTagValue("")
    setModalOpen(false)

    // Refresh the page to show the updated tag list
    router.refresh()
  }

  /**
   * Resets the tagEmptyError when the modal is closed.
   */
  useEffect(() => {
    if (modalOpen) {
      // Focus on the input field when the modal opens
      inputRef.current?.focus()
    } else {
      setTagEmptyError(false)
    }
  }, [modalOpen])

  return (
    <div className="add-tag-container">
      {/* Button to open the "Add Tag" modal */}
      <button data-testid="open-add-new-tag-modal" onClick={() => setModalOpen(true)} className="btn btn-neutral w-full">
        {text.addTag.addNewTag} <AiOutlinePlus className='ml-2' size={18} />
      </button>

      {/* Modal for adding a new tag */}
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewTag}>
          <h3 className="font-bold text-lg">{text.addTag.addNewTag}</h3>
          <div className="modal-action">
            {/* Input field for entering the new tag */}
            <input
              ref={inputRef}
              value={newTagValue}
              onChange={(e) => { setNewTagValue(e.target.value); setTagEmptyError(false) }}
              type='text'
              placeholder={text.addTag.typeHere}
              className={`input input-bordered w-full ${tagEmptyError ? "border-red-600" : ""}`}
            />

            {/* Button to submit the form */}
            <button data-testid="submit-form-button" type="submit" className="btn btn-neutral">
              {text.addTag.save}
            </button>
          </div>

          {/* Display an error message if the tag name is empty */}
          {tagEmptyError && (
            <span className="flex text-red-600">{text.erorrs.nameCannotBeEmpty}</span>
          )}
        </form>
      </Modal>
    </div>
  )
}

export default AddTag
