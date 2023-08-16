import * as Utils from "../index"

describe('getCurrentTimestamp', () => {
  it('returns the current timestamp in seconds', () => {
    // Get the current timestamp before and after calling the function
    const startTime = Math.floor(Date.now() / 1000)
    const currentTimestamp = Utils.getCurrentTimestamp()
    const endTime = Math.floor(Date.now() / 1000)

    // Check if the current timestamp is within the expected range
    expect(currentTimestamp).toBeGreaterThanOrEqual(startTime)
    expect(currentTimestamp).toBeLessThanOrEqual(endTime)
  })
})

describe('formatTimestampToHumanReadable', () => {
  it('formats timestamp to human-readable date and time', () => {
    const timestamp = Utils.getCurrentTimestamp()

    const formattedDate = Utils.formatTimestampToHumanReadable(timestamp)

    // Manually construct the expected formatted date based on the given timestamp
    const expectedFormattedDate = new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(new Date(timestamp * 1000))

    expect(formattedDate).toBe(expectedFormattedDate)
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
