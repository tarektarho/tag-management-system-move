import { ITag } from "@/types/tags"
import { BASE_URL, ERROR_INVALID_TAG } from "../utils/constants"
import { formatISODateToHumanReadable } from "../utils/index"

/**
 * Fetches all tags from the server.
 * @returns {Promise<ITag[]>} A promise that resolves to an array of tag objects.
 */

export const getAllTags = async (): Promise<ITag[]> => {
  try {
    const response = await fetch(`${BASE_URL}/tags`, {
      cache: 'no-store', // Fetches the resource from the remote server on every request
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch tags. Status code: ${response.status}`)
    }

    const responseData = await response.json()

    const formattedData: ITag[] = responseData.map((tag: ITag) => ({
      ...tag,
      createdAt: formatISODateToHumanReadable(tag.createdAt),
      updatedAt: formatISODateToHumanReadable(tag.updatedAt),
    }))

    return formattedData
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`An error occurred while fetching tags: ${error.message}`)
    } else {
      throw new Error(`An unknown error occurred while fetching tags`)
    }
  }
}

/**
 * Adds a new tag
 * @param {ITag} tag - The tag object to be added.
 * @returns {Promise<ITag>} A promise that resolves to the added tag object.
 */
export const addTag = async (tag: ITag): Promise<ITag> => {
  const name = tag.name.trim()
  if (!tag || name.length === 0) {
    throw new Error(ERROR_INVALID_TAG)
  }

  try {
    const response = await fetch(`${BASE_URL}/tags`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tag)
    })

    if (!response.ok) {
      throw new Error(`Request failed with the following status code: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    throw error
  }
}

/**
 * Edits an existing tag
 * @param {ITag} tag - The tag object to be edited.
 * @returns {Promise<ITag>} A promise that resolves to the edited tag object.
 */
export const editTag = async (tag: ITag): Promise<ITag> => {
  const name = tag.name.trim()

  if (name.length === 0) {
    throw new Error(ERROR_INVALID_TAG)
  }

  try {
    const response = await fetch(`${BASE_URL}/tags/${tag.id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(tag)
    })

    if (!response.ok) {
      throw new Error(`Request failed with status code: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`An error occurred while editing the tag: ${error.message}`)
    } else {
      throw new Error(`An unknown error occurred while editing tags`)
    }
  }
}


/**
 * Deletes a tag
 * @param {string} id - The ID of the tag to be deleted.
 * @returns {Promise<void>} A promise that resolves when the tag is deleted.
 */
export const deleteTag = async (id: string): Promise<void> => {
  const url = `${BASE_URL}/tags/${id}`

  try {
    const response = await fetch(url, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error(`Failed to delete tag. Status code: ${response.status}`)
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`An error occurred while deleting the tag: ${error.message}`)
    } else {
      throw new Error(`An unknown error occurred while deleting tags`)
    }
  }
};

