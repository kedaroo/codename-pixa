import { GitBranch, Github } from 'lucide-react'
import React from 'react'
import { GithubIcon } from './ui/icons/GithubIcon'

export default function LandingPage() {
  return (
    <div className='w-full mt-24'>
      <div className='flex flex-col items-center gap-4'>
        <div className='bg-gradient-to-br from-indigo-500 to-pink-500 border-none border-white/50 shadow-pink-500/30 rounded-full px-4 pt-0.5 pb-1'>
          <span className="text-sm text-white">
            ✨ Introducing Pixa
          </span>
        </div>
        <div className='text-6xl font-semibold tracking-tight text-center justify-center'>
          <div>
            <span className='bg-gradient-to-r text-transparent bg-clip-text from-[#FF1CF7] to-[#b249f8]'>Query</span> Your Memories,
          </div>
          <div>
            Relive the Moments
          </div>
        </div>
        <p className='text-neutral-600 text-2xl text-center font-[300]'>Upload, Search, Ask - Your Gallery, Reinvented</p>
        <div className='flex items-center justify-center gap-4 mt-2 text-sm'>
          <a
            className="bg-gradient-to-br from-blue-800 to-blue-600 transition-all duration-200 hover:translate-y-[-2px] py-2 px-4 rounded-full text-white"
            href="https://github.com/kedaroo/codename-pixa/blob/main/README.md"
          >
            Documentations
          </a>
          <a
            className=" transition-all duration-100 border-b border-b-transparent flex items-center gap-2 outline outline-1 outline-neutral-600 hover:translate-y-[-2px] hover:outline-neutral-400 px-4 py-2 rounded-full"
            href="https://github.com/kedaroo/codename-pixa"
          >
            <GithubIcon size={20} />Github
          </a>
        </div>
        <div className='flex justify-center items-center mt-4'>
          <a className='p-0.5 bg-white dark:bg-neutral-900 outline outline-1.5 outline-neutral-700 rounded-full relative translate-x-2 hover:translate-x-0 transition-all duration-200 z-10' href='https://github.com/siddhigate'>
            <img className="size-10 rounded-full z-10" alt="Siddhi Gate" src="https://avatars.githubusercontent.com/u/80971056?v=4" />
          </a>
          <a className='p-0.5 bg-white dark:bg-neutral-900 outline outline-1.5 outline-neutral-700 rounded-full hover:translate-x-[-0.5rem] transition-all duration-200 relative z-20' href='https://github.com/OMGATE23'>
            <img className="size-10 rounded-full z-20" alt="Om Gate" src="https://avatars.githubusercontent.com/u/90276220?v=4" />
          </a>
          <a className='p-0.5 bg-white dark:bg-neutral-900 outline outline-1.5 outline-neutral-700 rounded-full hover:translate-x-[-1rem] transition-all duration-200 relative translate-x-[-0.5rem] z-30' href='https://github.com/kedaroo'>
            <img className="size-10 rounded-full z-30" alt="Kedar Basutkar" src="https://avatars.githubusercontent.com/u/41827102?v=4" />
          </a>
        </div>
        <div className='mt-16'>
          <h3 className='text-center font-semibold text-5xl mb-8'>Features</h3>
          <div className='flex flex-col lg:flex-row items-center justify-center gap-6'>
            <div className="rounded-md p-4 max-w-[260px] h-[300px] relative">
              <p className="z-40 relative text-tiny text-white/90 uppercase font-bold">
                Smart Search
              </p>
              <h4 className="z-40 relative text-white font-medium text-large">
                Find the photos in Natural Language Queries
              </h4>
              <img className='block absolute w-full h-full top-0 left-0 rounded-md object-cover opacity-90 dark:opacity-50' alt='feature 2' src="/feature-search.jpg" />
            </div>
            <div className="rounded-md p-4 max-w-[260px] h-[300px] relative">
              <p className="z-40 relative text-tiny text-white/90 uppercase font-bold">
                Access Anywhere
              </p>
              <h4 className="z-40 relative text-white font-medium text-large">
                View your photos from any device, anytime
              </h4>
              <img className='block absolute w-full h-full top-0 left-0 rounded-md object-cover opacity-90 dark:opacity-50' alt='feature 2' src="/features-devices.jpg" />
            </div>
            <div className="rounded-md p-4 max-w-[260px] h-[300px] relative">
              <p className="z-40 relative text-tiny text-white/90 uppercase font-bold">
                Fast uploads
              </p>
              <h4 className="z-40 relative text-white font-medium text-large">
                Upload and store your photos securely in the cloud
              </h4>
              <img className='block absolute w-full h-full top-0 left-0 rounded-md object-cover opacity-90 dark:opacity-50' alt='feature 2' src="/speed.jpg" />
            </div>
          </div>
        </div>
        <div className='text-5xl font-semibold tracking-tight text-center justify-center mt-20'>
          <div>
            Built for
            <span className='bg-gradient-to-r text-transparent bg-clip-text from-blue-600 to-blue-400'>&nbsp;HackFrost</span> Hackathon
          </div>
          <div>
            Using<span className='bg-gradient-to-r text-transparent bg-clip-text from-violet-800 to-violet-600'>&nbsp;Kestra</span>
          </div>
        </div>
        <footer className='mt-16 mb-8 w-full text-center flex flex-col gap-2 text-sm'>
          <p>Made with <span className='text-purple-400'>Kestra</span>, NextJS, <span className='text-green-700'>Supabase</span> and love</p>
        </footer>
      </div>

    </div>
  )
}
