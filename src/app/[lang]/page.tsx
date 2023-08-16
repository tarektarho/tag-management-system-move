"use server"
import { getAllTags } from "@/api/api"
import TagList from "./components/TagList"
import AddTag from "./components/AddTag"
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import { IPageText } from "../../types/pageText"

const Home = async ({
  params: { lang }
}: {
  params: { lang: Locale }
}) => {

  // Fetch the page text using the getDictionary function and the specified language
  const { page }: IPageText = await getDictionary(lang) as any

  // Fetch all tags using the getAllTags function
  const tags = await getAllTags() //Extracting the method logic for testing

  return (
    <div className='flex min-h-screen flex-col items-center p-24'>
      <div className='mb-10 text-center lg:max-w-5xl lg:w-full lg:grid-cols-4'>
        <AddTag text={page} />
      </div>
      {/* Handle empty list */}
      {tags.length !== 0 ? (<div className="tag-content-container">
        <TagList text={page} tags={tags} />
      </div>) : (<div className="mockup-code">
        <pre><code>{page.emptyStateMessage}</code></pre>
      </div>)}
    </div>
  )
}

export default Home
