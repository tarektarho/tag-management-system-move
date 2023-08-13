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
