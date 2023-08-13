import * as API from '../api'
import fetchMock from "jest-fetch-mock"
import { ITag } from "../../types/tags"
import { BASE_URL, ERROR_INVALID_TAG } from "@/utils/constants"
import { STATUS_CREATED } from "../../utils/constants"

// Mock the global fetch function
fetchMock.enableMocks()

describe('API Tests', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  const mockTags: ITag[] = [
    { id: '1', name: 'Tag 1', deleted: false, createdAt: '2023-08-12T09:47:36.247Z' },
    { id: '2', name: 'Tag 2', deleted: false, createdAt: '2023-08-13T10:12:45.123Z' },
  ]

  describe('getAllTags', () => {
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
      // Mock the fetch response to throw an error
      fetchMock.mockRejectedValueOnce(new Error('Network error'))

      await expect(API.getAllTags()).rejects.toThrow('Network error')
    })
  })

  describe('addTag', () => {
    it('adds a tag successfully', async () => {
      const newTag: ITag = {
        id: 'new-tag-id',
        name: 'New Tag',
        deleted: false,
      }

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

      const newTag: ITag = {
        id: 'new-tag-id',
        name: 'New Tag',
        deleted: false,
        createdAt: '2023-08-12T09:47:36.247Z',
      }

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
  })
})
