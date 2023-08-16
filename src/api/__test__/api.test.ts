import * as API from '../api'
import fetchMock from "jest-fetch-mock"
import { ITag } from "../../types/tags"
import { BASE_URL, ERROR_INVALID_TAG, STATUS_OK } from "@/utils/constants"
import { STATUS_CREATED } from "../../utils/constants"
import { formatISODateToHumanReadable } from "../../utils/index"

// Mock the global fetch function
fetchMock.enableMocks()

describe('API Tests', () => {

  const formatedDate = formatISODateToHumanReadable('1692046409')
  const mockTags: ITag[] = [
    { id: '1', name: 'Tag 1', deleted: false, createdAt: formatedDate, updatedAt: formatedDate },
    { id: '2', name: 'Tag 2', deleted: false, createdAt: formatedDate, updatedAt: formatedDate },
  ]

  describe('getAllTags', () => {
    // Reset fetchMock and clear mock call information after each test
    afterEach(() => {
      fetchMock.resetMocks()
      fetchMock.mockClear()
    })

    it('fetches data successfully from an API', async () => {
      // Mock the fetch response with mockTags data
      fetchMock.mockResponseOnce(JSON.stringify(mockTags))

      // Call the API function to fetch tags
      const tags = await API.getAllTags()

      // Assert that the returned tags match the mockTags data
      expect(tags).toEqual(mockTags)
    })

    it('throws an error when the response status is not 200', async () => {
      // Mock the fetch response with a status code of 400
      fetchMock.mockResponseOnce(JSON.stringify({}), { status: 400 })

      // Expect that calling getAllTags will throw an error
      await expect(API.getAllTags()).rejects.toThrowError()
    })

    it('throws an error when fetch fails', async () => {
      const errorMessage = 'Unknown Error'
      // Modify the fetch mock to simulate an unknown error
      fetchMock.mockRejectedValueOnce(new Error(errorMessage))

      // Expect that calling getAllTags will throw an error message
      await expect(API.getAllTags()).rejects.toThrow(
        `An error occurred while fetching tags: ${errorMessage}`
      )
    })

    it('throws an unknown error for non-Error object', async () => {
      const errorMessage = 'An unknown error occurred while fetching tags'
      // Mock the fetch response to throw a non-Error object
      fetchMock.mockRejectedValueOnce(errorMessage)

      // Expect that calling getAllTags will throw the same error message
      await expect(API.getAllTags()).rejects.toThrow(errorMessage)
    })
  })

  describe('addTag', () => {
    // Reset fetchMock and clear mock call information after each test
    afterEach(() => {
      fetchMock.resetMocks()
      fetchMock.mockClear()
    })

    // Define a mock new tag object
    const newTag: ITag = {
      id: 'new-tag-id',
      name: 'New Tag',
      deleted: false,
      createdAt: '2023-08-12T09:47:36.247Z',
    }

    it('adds a tag successfully', async () => {
      // Prepare a mock response for a successful POST request
      const mockResponse = { ...newTag }
      fetchMock.mockResponse(JSON.stringify(mockResponse), {
        status: STATUS_CREATED,
        headers: { 'Content-Type': 'application/json' },
      })

      // Call the API function to add a tag
      const result = await API.addTag(newTag)

      // Assertions
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

      // Expect that calling addTag will throw a specific error message
      await expect(API.addTag(newTag)).rejects.toThrow('Failed to add tag')
      expect(fetchMock).toHaveBeenCalledWith(
        `${BASE_URL}/tags`,
        expect.any(Object)
      )
    })

    it('throws an error for an empty tag name', async () => {
      // Prepare a mock response with an empty tag name
      const mockResponse: ITag = {
        id: 'new-id',
        name: '',
        deleted: false,
      }

      // Expect that calling addTag will throw an error for invalid tag
      await expect(() => API.addTag(mockResponse)).rejects.toThrowError(
        ERROR_INVALID_TAG
      )
    })

    it('throws an error for non-OK response status', async () => {
      // Mock the fetch response for a non-OK POST request
      fetchMock.mockResponseOnce(JSON.stringify({}), {
        status: 400,
      })

      // Expect that calling addTag will throw an error
      await expect(API.addTag(newTag)).rejects.toThrowError(
        'Request failed with the following status code: 400'
      )
    })
  })


  describe('editTag', () => {
    // Reset fetchMock and clear mock call information after each test
    afterEach(() => {
      fetchMock.mockClear()
      fetchMock.resetMocks()
    })

    // Mock tag data for testing
    const mockTag = { id: '1', name: 'Updated Tag', deleted: false }

    it('throws an error when the tag is invalid', async () => {
      const invalidTag = { id: '1', name: '', deleted: false } // Invalid tag with empty name
      await expect(API.editTag(invalidTag)).rejects.toThrow(ERROR_INVALID_TAG)
    })

    it('returns the updated tag when the request is successful', async () => {
      // Prepare a mock response for a successful PUT request
      fetchMock.mockResponse(JSON.stringify(mockTag), {
        status: STATUS_OK,
      })

      // Call the editTag function and expect the result to match the mockTag data
      const result = await API.editTag(mockTag)
      expect(result).toEqual(mockTag)

      // Verify that fetch was called with the correct URL and options
      expect(global.fetch).toHaveBeenCalledWith(
        `${BASE_URL}/tags/${mockTag.id}`,
        expect.objectContaining({
          method: 'PUT',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(mockTag),
        })
      )
    })

    it('throws an error when the request fails', async () => {
      const errorMessage = 'Request failed'
      // Mock the fetch function to simulate a rejected promise
      fetchMock.mockRejectedValueOnce(new Error(errorMessage))

      // Expect the editTag function to throw an error with the error message
      await expect(API.editTag(mockTag)).rejects.toThrow(errorMessage)

      // Verify that fetch was called with the correct URL and options
      expect(global.fetch).toHaveBeenCalledWith(
        `${BASE_URL}/tags/${mockTag.id}`,
        expect.objectContaining({
          method: 'PUT',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(mockTag),
        })
      )
    })

    it('throws an error for non-OK response status', async () => {
      // Mock the fetch response for a non-OK PUT request
      fetchMock.mockResponseOnce(JSON.stringify(mockTag), {
        status: 400,
      })

      // Expect the editTag function to throw an error with status code
      await expect(API.editTag(mockTag)).rejects.toThrow(
        'Request failed with status code: 400'
      )
    })

    it('throws an error when editing fails with custom error message', async () => {
      const errorMessage = 'Unknown Error'
      // Modify the fetch mock to simulate an unknown error
      fetchMock.mockRejectedValueOnce(new Error(errorMessage))

      // Expect that calling editTag will throw an unknown error message
      await expect(API.editTag(mockTag)).rejects.toThrow(
        `An error occurred while editing the tag: ${errorMessage}`
      )
    })

    it('throws an unknown error for non-Error object', async () => {
      const errorMessage = 'An unknown error occurred while editing tags'
      // Mock the fetch response to throw an error
      fetchMock.mockRejectedValueOnce(errorMessage)

      // Expect that calling editTag will throw an unknown error message
      await expect(API.editTag(mockTag)).rejects.toThrow(errorMessage)
    })
  })


  describe('deleteTag function', () => {
    // Reset fetchMock and clear mock call information after each test
    afterEach(() => {
      fetchMock.mockClear()
      fetchMock.resetMocks()
    })

    // Mock tag data for testing
    const mockTag = { id: '1', name: 'Updated Tag', deleted: false }

    it('deletes a tag successfully', async () => {
      // Prepare a mock response for a successful DELETE request
      fetchMock.mockResponse(JSON.stringify(mockTag), {
        status: STATUS_OK,
      })

      // Call the deleteTag function
      await API.deleteTag(mockTag.id)

      // Verify that fetch was called with the correct URL and options
      expect(global.fetch).toHaveBeenCalledWith(
        `${BASE_URL}/tags/${mockTag.id}`,
        expect.objectContaining({
          method: 'DELETE',
        })
      )
    })

    it('throws an error when deletion fails', async () => {
      // Prepare a mock response for a failed DELETE request
      fetchMock.mockResponse(JSON.stringify(mockTag), {
        status: 404,
      })

      // Expect that calling deleteTag will throw an error with status code
      await expect(API.deleteTag(mockTag.id)).rejects.toThrow(
        `Failed to delete tag. Status code: 404`
      )
    })

    it('throws an error when an unknown error occurs', async () => {
      const errorMessage = 'An unknown error occurred while deleting tags'
      // Mock the fetch response to throw an error
      fetchMock.mockRejectedValueOnce(errorMessage)

      // Expect that calling deleteTag will throw an unknown error message
      await expect(API.deleteTag(mockTag.id)).rejects.toThrow(errorMessage)
    })
  })
})
