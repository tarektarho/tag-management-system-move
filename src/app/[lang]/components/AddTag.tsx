"use client"
import { AiOutlinePlus } from "react-icons/ai"
import Modal from "./Modal"
import { FormEventHandler, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { addTag } from "../../../api/api"
import { generateUUID } from "../../../utils/index"
import { IPageText } from "../../../types/pageText"

interface AddTagProps {
  text: IPageText['page']['addTag']
}

const AddTag: React.FC<AddTagProps> = ({ text }) => {
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [newTagValue, setNewTagValue] = useState<string>("")
  const [tagEmptyError, setTagEmptyError] = useState<boolean>(false)

  const handleSubmitNewTag: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    if (!newTagValue) {
      setTagEmptyError(true)
      return
    }

    try {
      await addTag({
        id: generateUUID(),
        name: newTagValue,
        deleted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      setNewTagValue("")
      setModalOpen(false)
      router.refresh()
    } catch (error) {
      throw new Error("Something went wrong")
    }

  }

  useEffect(() => {
    if (!modalOpen) {
      setTagEmptyError(false) // Reset tagEmptyError when modal is closed
    }
  }, [modalOpen])

  return (
    <div>
      <button data-testid="open-add-new-tag-modal" onClick={() => setModalOpen(true)} className="btn btn-neutral w-full">
        {text.addNewTag} <AiOutlinePlus className='ml-2' size={18} />
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewTag}>
          <h3 className="font-bold text-lg">{text.addNewTag}</h3>
          <div className="modal-action">
            <input value={newTagValue}
              onChange={(e) => { setNewTagValue(e.target.value); setTagEmptyError(false) }}

              type='text'
              placeholder={text.typeHere}
              className={`input input-bordered w-full ${tagEmptyError ? "border-red-600" : "" // Add border color class conditionally
                }`}
            />

            <button data-testid="submit-form-button" type="submit" className="btn btn-neutral">
              {text.save}
            </button>
          </div>
          {tagEmptyError && (
            <span className="flex text-red-600">{text.failedToAddNewTag}</span>
          )}
        </form>
      </Modal>
    </div>
  )
}

export default AddTag
