"use client"
import React, { useState } from 'react'
import { ITag } from "../../../types/tags"
import Tag from "./Tag"
import { IPageText } from "../../../types/pageText"

interface TagProps {
  tags: ITag[]
  text: IPageText['page']
}

export const ITEMS_PER_PAGE = 10

const TagList: React.FC<TagProps> = ({ tags, text }) => { //todo handle case when tags are empty
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(tags.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const visibleTags = tags.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className='overflow-x-auto'>
      <div className="flex">
        <table className='table w-full'>
          {/* head */}
          <thead>
            <tr>
              <th>Tags</th>
              <th>{text.tagList.createdAt}</th>
              <th>{text.tagList.updatedAt}</th>
              <th>{text.tagList.actions}</th>
            </tr>
          </thead>
          <tbody>
            {visibleTags.map((tag) => (
              <Tag text={text} key={tag.id} tag={tag} />
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination controls */}
      <div className="flex items-center mt-2 justify-between flex-col sm:flex-row">
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              data-testid="pagination-button"
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`${currentPage} === ${index + 1 ? 'active' : ''} btn btn-neutral ml-2`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <span>{text.tagList.rowsPerPage} | {text.tagList.total}: {tags.length}</span>
      </div>
    </div>
  )
}

export default TagList
