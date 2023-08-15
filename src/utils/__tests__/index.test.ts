import { ITag } from "@/types/tags"
import * as Utils from "../index"

describe("Utils", () => {
  describe("generateUUID", () => {
    it("generates a valid UUID", () => {
      const result = Utils.generateUUID()
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
      expect(result).toMatch(uuidRegex)
    })
  })
})

describe('formatISODateToHumanReadable', () => {
  it('formats ISO date to human-readable format', () => {
    const isoDateString = '2023-08-12T09:47:36.247Z'
    const expectedFormattedDate = '12 August 2023 at 11:47:36'

    const formattedDate = Utils.formatISODateToHumanReadable(isoDateString)

    expect(formattedDate).toEqual(expectedFormattedDate)
  })
})

describe('getCurrentISODate', () => {
  it('returns the current ISO date in the correct format', () => {
    const originalDate = Date // Save the original Date constructor
    const mockDate = new Date('2023-08-15T12:34:56.789Z')
    global.Date = jest.fn(() => mockDate) as unknown as typeof global.Date // Replace global Date with mockDate

    const isoDate = Utils.getCurrentISODate()

    expect(isoDate).toBe('2023-08-15T12:34:56.789Z')

    global.Date = originalDate // Restore the original Date constructor
  })
})


describe('redirectedPathName Utility Method', () => {
  it('generates the correct redirected path with valid pathName', () => {
    const locale = 'nl'
    const pathName = '/en/some-page'

    const newPath = Utils.redirectedPathName(locale, pathName)

    expect(newPath).toEqual('/nl/some-page')
  })

  it('generates root path with empty pathName', () => {
    const locale = 'nl'
    const pathName = ''

    const newPath = Utils.redirectedPathName(locale, pathName)

    expect(newPath).toEqual('/')
  })
})


describe('orderTagsByDescendingUpdatedAt function', () => {
  it('orders tags by descending updatedAt timestamp', () => {
    // Create mock tags with different updatedAt timestamps
    const tags: ITag[] = [
      { id: '1', name: 'Tag 1', updatedAt: '2023-08-15T10:00:00.000Z' },
      { id: '2', name: 'Tag 2', updatedAt: '2023-08-15T09:00:00.000Z' },
      { id: '3', name: 'Tag 3', updatedAt: '2023-08-15T11:00:00.000Z' },
    ]

    // Call the orderTagsByDescendingUpdatedAt function
    const orderedTags = Utils.orderTagsByDescendingUpdatedAt(tags)

    // Verify that the tags are correctly ordered by updatedAt timestamp
    expect(orderedTags).toEqual([
      { id: '3', name: 'Tag 3', updatedAt: '2023-08-15T11:00:00.000Z' },
      { id: '1', name: 'Tag 1', updatedAt: '2023-08-15T10:00:00.000Z' },
      { id: '2', name: 'Tag 2', updatedAt: '2023-08-15T09:00:00.000Z' },
    ])
  })

  it('handles empty array', () => {
    // Call the orderTagsByDescendingUpdatedAt function with an empty array
    const orderedTags = Utils.orderTagsByDescendingUpdatedAt([])

    // Verify that the result is an empty array as well
    expect(orderedTags).toEqual([])
  })

  it('does not modify the original array', () => {
    // Create mock tags
    const originalTags = [
      { id: '1', name: 'Tag 1', updatedAt: '2023-08-15T10:00:00.000Z' },
      { id: '2', name: 'Tag 2', updatedAt: '2023-08-15T09:00:00.000Z' },
    ]

    // Call the orderTagsByDescendingUpdatedAt function
    Utils.orderTagsByDescendingUpdatedAt(originalTags)

    // Verify that the original array remains unchanged
    expect(originalTags).toEqual([
      { id: '1', name: 'Tag 1', updatedAt: '2023-08-15T10:00:00.000Z' },
      { id: '2', name: 'Tag 2', updatedAt: '2023-08-15T09:00:00.000Z' },
    ])
  })
})
