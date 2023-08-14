"use client"
import { AiOutlinePlus } from "react-icons/ai"
import Modal from "./Modal"
import { FormEventHandler, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { addTag } from "../../../api/api"
import { generateUUID, getCurrentISODate } from "../../../utils/index"
import { IPageText } from "../../../types/pageText"

interface AddTagProps {
  text: IPageText['page']
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

    await addTag({
      id: generateUUID(),
      name: newTagValue,
      deleted: false,
      createdAt: getCurrentISODate(),
      updatedAt: getCurrentISODate()
    })
    setNewTagValue("")
    setModalOpen(false)
    router.refresh()

  }

  useEffect(() => {
    if (!modalOpen) {
      setTagEmptyError(false) // Reset tagEmptyError when modal is closed
    }
  }, [modalOpen])

  return (
    <div className="add-tag-container">
      <button data-testid="open-add-new-tag-modal" onClick={() => setModalOpen(true)} className="btn btn-neutral w-full">
        {text.addTag.addNewTag} <AiOutlinePlus className='ml-2' size={18} />
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewTag}>
          <h3 className="font-bold text-lg">{text.addTag.addNewTag}</h3>
          <div className="modal-action">
            <input value={newTagValue}
              onChange={(e) => { setNewTagValue(e.target.value); setTagEmptyError(false) }}

              type='text'
              placeholder={text.addTag.typeHere}
              className={`input input-bordered w-full ${tagEmptyError ? "border-red-600" : ""
                }`}
            />

            <button data-testid="submit-form-button" type="submit" className="btn btn-neutral">
              {text.addTag.save}
            </button>
          </div>
          {tagEmptyError && (
            <span className="flex text-red-600">{text.erorrs.nameCannotBeEmpty}</span>
          )}
        </form>
      </Modal>
    </div>
  )
}

export default AddTag
