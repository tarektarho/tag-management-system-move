import * as API from '../api'
import fetchMock from "jest-fetch-mock"
import { ITag } from "../../types/tags"
import { BASE_URL, ERROR_INVALID_TAG, STATUS_OK } from "@/utils/constants"
import { STATUS_CREATED } from "../../utils/constants"

// Mock the global fetch function
fetchMock.enableMocks()

describe('API Tests', () => {

  const mockTags: ITag[] = [
    { id: '1', name: 'Tag 1', deleted: false, createdAt: '2023-08-12T09:47:36.247Z' },
    { id: '2', name: 'Tag 2', deleted: false, createdAt: '2023-08-13T10:12:45.123Z' },
  ]

  describe('getAllTags', () => {
    afterEach(() => {
      fetchMock.resetMocks()
      fetchMock.mockClear()
    })
    it('fetches successfully data from an API', async () => {
      // Mock the fetch response
      fetchMock.mockResponseOnce(JSON.stringify(mockTags))

      const tags = await API.getAllTags()

      expect(tags).toEqual(mockTags)
    })

    it('throws an error when the response status is not 200', async () => {
      // Mock the fetch response
      fetchMock.mockResponseOnce(JSON.stringify({}), { status: 400 })

      await expect(API.getAllTags()).rejects.toThrowError()
    })

    it('throws an error when fetch fails', async () => {
      const errorMessage = 'Unknown Error'
      // Modify the fetch mock to simulate an unknown error
      fetchMock.mockRejectedValueOnce(new Error(errorMessage))

      // Expect that calling getAllTags will throw an unknown error message
      await expect(API.getAllTags()).rejects.toThrow(
        `An error occurred while fetching tags: ${errorMessage}`
      )
    })

    it('throws an unknown error for non-Error object', async () => {
      const errorMessage = 'An unknown error occurred while fetching tags'
      // Mock the fetch response to throw an error
      fetchMock.mockRejectedValueOnce(errorMessage)
      await expect(API.getAllTags()).rejects.toThrow(errorMessage)
    })

  })

  describe('addTag', () => {
    afterEach(() => {
      fetchMock.resetMocks()
      fetchMock.mockClear()
    })

    const newTag: ITag = {
      id: 'new-tag-id',
      name: 'New Tag',
      deleted: false,
      createdAt: '2023-08-12T09:47:36.247Z',
    }

    it('adds a tag successfully', async () => {
      const mockResponse = { ...newTag }
      // Mock the fetch response for a successful POST request
      fetchMock.mockResponse(JSON.stringify(mockResponse), {
        status: STATUS_CREATED, // Status code for successful creation
        headers: { 'Content-Type': 'application/json' }
      })

      const result = await API.addTag(newTag)

      expect(result).toEqual(mockResponse)
      expect(fetchMock).toHaveBeenCalledWith(
        `${BASE_URL}/tags`,
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTag),
        })
      )
    })

    it('throws an error for a failed request', async () => {
      // Mock the fetch response for a failed POST request
      fetchMock.mockRejectedValueOnce(new Error('Failed to add tag'))

      await expect(API.addTag(newTag)).rejects.toThrow('Failed to add tag')
      expect(fetchMock).toHaveBeenCalledWith(
        `${BASE_URL}/tags`,
        expect.any(Object)
      )
    })

    it('throws an error for an empty tag name', async () => {
      const mockResponse: ITag = {
        id: 'new-id',
        name: '',
        deleted: false,
      }

      await expect(() => API.addTag(mockResponse)).rejects.toThrowError(
        ERROR_INVALID_TAG,
      )
    })

    it('throws an error for non-OK response status', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({}), {
        status: 400
      })
      // Expect that calling addTag will throw an error
      await expect(API.addTag(newTag)).rejects.toThrowError(
        'Request failed with the following status code: 400'
      )
    })

  })

  describe('editTag', () => {

    afterEach(() => {
      fetchMock.mockClear()
      fetchMock.resetMocks()
    })
    const mockTag = { id: '1', name: 'Updated Tag', deleted: false } // Mock tag data

    it('throws an error when tag is invalid', async () => {
      const invalidTag = { id: '1', name: '', deleted: false } // Invalid tag with empty name
      await expect(API.editTag(invalidTag)).rejects.toThrow(ERROR_INVALID_TAG)
    })

    it('returns the updated tag when the request is successful', async () => {
      // Mock the fetch function to return the mockResponse
      fetchMock.mockResponse(JSON.stringify(mockTag), {
        status: STATUS_OK, // Status code for successful creation
      })


      // Call the editTag function and expect the result to match the mockTag data
      const result = await API.editTag(mockTag)
      expect(result).toEqual(mockTag)

      // Verify that fetch was called with the correct URL and options
      expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/tags/${mockTag.id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(mockTag),
      })
    })

    it('throws an error when the request fails', async () => {
      // Mock the fetch function to simulate a rejected promise
      fetchMock.mockRejectedValueOnce(new Error('Request failed'))

      // Expect the editTag function to throw an error
      await expect(API.editTag(mockTag)).rejects.toThrow('Request failed')

      // Verify that fetch was called with the correct URL and options
      expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/tags/${mockTag.id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(mockTag),
      })
    })

    it('throws an error for non-OK response status', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(mockTag), {
        status: 400
      })
      await expect(API.editTag(mockTag)).rejects.toThrow('Request failed with status code: 400')
    })

    it('throws an error when edit fails with custom error message', async () => {
      const errorMessage = 'Unknown Error'
      // Modify the fetch mock to simulate an unknown error
      fetchMock.mockRejectedValueOnce(new Error(errorMessage))

      // Expect that calling getAllTags will throw an unknown error message
      await expect(API.editTag(mockTag)).rejects.toThrow(
        `An error occurred while editing the tag: ${errorMessage}`
      )
    })

    it('throws an unknown error for non-Error object', async () => {
      const errorMessage = 'An unknown error occurred while editing tags'
      // Mock the fetch response to throw an error
      fetchMock.mockRejectedValueOnce(errorMessage)
      await expect(API.editTag(mockTag)).rejects.toThrow(errorMessage)
    })

  })


  describe('deleteTag function', () => {
    afterEach(() => {
      fetchMock.mockClear()
      fetchMock.resetMocks()
    })

    const mockTag = { id: '1', name: 'Updated Tag', deleted: false } // Mock tag data

    it('deletes a tag successfully', async () => {

      fetchMock.mockResponse(JSON.stringify(mockTag), {
        status: STATUS_OK,
        headers: { 'Content-Type': 'application/json' }
      })
      API.deleteTag(mockTag.id)
      expect(fetchMock).toHaveBeenCalledWith(
        `${BASE_URL}/tags/${mockTag.id}`,
        expect.objectContaining({
          method: 'DELETE',
        })
      )
    })

    it('throws an error when deletion fails', async () => {

      fetchMock.mockResponse(JSON.stringify(mockTag), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      })

      await expect(API.deleteTag(mockTag.id)).rejects.toThrow(
        `Failed to delete tag. Status code: 404`
      )
    })

    it('throws an error when an unknown error occurs', async () => {
      const errorMessage = 'An unknown error occurred while deleting tags'
      // Mock the fetch response to throw an error
      fetchMock.mockRejectedValueOnce(errorMessage)
      await expect(API.deleteTag(mockTag.id)).rejects.toThrow(errorMessage)
    })
  })

})
