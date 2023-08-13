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
  const { page }: IPageText = await getDictionary(lang) as any
  const tags = await getAllTags()

  return (
    <div className='flex min-h-screen flex-col items-center p-24'>
      <div className='mb-10 text-center lg:max-w-5xl lg:w-full lg:grid-cols-4'>
        <AddTag text={page.addTag} />
      </div>
      <TagList text={page} tags={tags} />
    </div>
  )
}

export default Home
