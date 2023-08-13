import { ITag } from "@/types/tags"
import { STATUS_OK, BASE_URL, ERROR_INVALID_TAG } from "../utils/constants"


export const getAllTags = async (): Promise<ITag[]> => {
  try {
    const response = await fetch(`${BASE_URL}/tags`, {
      cache: "no-cache"
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch tags. Status code: ${response.status}`)
    }

    const responseData = await response.json()
    return responseData
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`An error occurred while fetching tags: ${error.message}`)
    } else {
      throw new Error(`An unknown error occurred while fetching tags`)
    }
  }
}


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


//todo optimize and test
export const editTag = async (tag: ITag): Promise<ITag> => {

  try {
    const response = await fetch(`${BASE_URL}/tags/${tag.id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(tag)
    })
    const responseData = await response.json()

    if (response.status === STATUS_OK) {
      return responseData
    }

    throw responseData
  } catch (error) {
    throw error
  }
}

//todo optimize and test
export const deleteTag = async (id: string): Promise<any> => {
  try {
    await fetch(`${BASE_URL}/tags/${id}`, {
      method: 'DELETE',
    })
  } catch (error) {
    throw error
  }
}
