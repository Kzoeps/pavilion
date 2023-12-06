import { cn } from '@/lib/utils'
import Image from 'next/image'
import Wave from '@/public/sine.png'
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 pt-12">
      <section className='w-3/5 flex' >
        <div className='w-2/5'>
          <h1 className={cn("scroll-m-20 text-8xl font-bold tracking-wide pb-3 lg:text-5xl text-left font-archivo")}>Easily Manage <br />COM 499 Reqs</h1>
          <h3 className={cn("text-lg font-bold text-gray-500  text-left")}>Pavilion is an all in one platform that makes managing COM 499 requirements easy for admins and taking notes easier for students</h3>
        </div>
        <Image src={Wave} alt='waves'/>
      </section>
      <section className='mt-12 text-left w-3/5'>
        <h2 className={cn("text-4xl font-bold text-left")}>Features</h2>
        <div className="grid grid-cols-3 gap-12">
          <div className=' col-span-1 border border-solid border-gray-400 rounded-md p-4 mt-8' >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Add Talks{' '}

            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Instantly add talks that can be seen by everyone
            </p>
          </div>
          <div className=' col-span-1 border border-solid border-gray-400 rounded-md p-4 mt-8' >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Centralized Note Taking{' '}

            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Store all your notes in one place, no way to every lose them
            </p>
          </div>
          <div className=' col-span-1 border border-solid border-gray-400 rounded-md p-4 mt-8' >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Notes Approval{' '}

            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Professors! Easily approve notes of your student</p>
          </div>
          <div className=' col-span-1 border border-solid border-gray-400 rounded-md p-4' >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Tracking made easy{' '}

            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Easily track the progress of your students or your own progress</p>
          </div>
          <div className=' col-span-1 border border-solid border-gray-400 rounded-md p-4' >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Filters Filters Filters{' '}

            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Only want to check the progress of seniors? Just click a button!</p>
          </div>
          <div className=' col-span-1 border border-solid border-gray-400 rounded-md p-4' >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Fast{' '}
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Save Time with Next 14 the app is smooth and sexy</p>
          </div>
        </div>

      </section>
    </main>
  )
}
