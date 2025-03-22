import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='bg-white h-screen select-none'>
      <div className="flex justify-center text-black items-center h-full">
        <div className="flex flex-col gap-3">
          <h2 className='text-center text-5xl'>Not Found</h2>
          <div className="">
            <p className='font-light'>Could not find requested resource</p>
            <div className="flex justify-end">
              <Link href="/">Return Home</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
