import { ITag } from "@/types/tags"

export const generateUUID = (): string => {
  const uuidFormat = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
  return uuidFormat.replace(/[xy]/g, (char: string) => {
    const random = Math.random() * 16 | 0
    const value = char === 'x' ? random : (random & 0x3 | 0x8) // For "4" in uuid
    return value.toString(16)
  })
}

export const getCurrentISODate = (): string => {
  return new Date().toISOString()
}

export const formatISODateToHumanReadable = (isoDateString: string): string => {
  const isoDate = new Date(isoDateString)

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }

  const humanReadableDate = isoDate.toLocaleString('en-GB', options)
  return humanReadableDate as ITag['createdAt'] | ITag['updatedAt']
}


export const redirectedPathName = (locale: string, pathName: string) => {
  if (!pathName) return '/'
  const segments = pathName.split('/')
  segments[1] = locale
  return segments.join('/')
}


// This function takes an array of 'ITag' objects as a parameter and returns an array of 'ITag' objects
export const orderTagsByDescendingUpdatedAt = (tags: ITag[]): ITag[] => {
  // Use the 'slice' method to create a shallow copy of the 'tags' array
  // This is done to avoid modifying the original array
  return tags.slice().sort((tagA, tagB) => { //time complexity of O(n) for slice and O(n log n) for sort
    const timestampA = new Date(tagA.updatedAt).getTime()
    const timestampB = new Date(tagB.updatedAt).getTime()

    return timestampB - timestampA
  })
}
