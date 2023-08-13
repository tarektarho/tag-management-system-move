"use server"
import { getAllTags } from "@/api/api"
import TagList from "./components/TagList"
import AddTag from "./components/AddTag"
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import { IPageText } from "../../types/pageText"
import { ITag } from "@/types/tags"

const Home = async ({
  params: { lang }
}: {
  params: { lang: Locale }
}) => {

  // Fetch the page text using the getDictionary function and the specified language
  const { page }: IPageText = await getDictionary(lang) as any

  // Fetch all tags using the getAllTags function
  const tags = await getAllTags()

  // This function takes an array of 'ITag' objects as a parameter and returns an array of 'ITag' objects
  const orderTagsByDescendingUpdatedAt = (tags: ITag[]): ITag[] => {
    // Use the 'slice' method to create a shallow copy of the 'tags' array
    // This is done to avoid modifying the original array
    return tags.slice().sort((tagA, tagB) => { //time complexity of O(n) for slice and O(n log n) for sort
      const timestampA = new Date(tagA.updatedAt).getTime()
      const timestampB = new Date(tagB.updatedAt).getTime()

      return timestampB - timestampA
    })
  }
  return (
    <div className='flex min-h-screen flex-col items-center p-24'>
      <div className='mb-10 text-center lg:max-w-5xl lg:w-full lg:grid-cols-4'>
        <AddTag text={page.addTag} />
      </div>
      <TagList text={page} tags={orderTagsByDescendingUpdatedAt(tags)} />
    </div>
  )
}

export default Home
