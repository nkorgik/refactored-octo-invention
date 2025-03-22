import Header from '@/components/header';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="">
      <div className="flex-1 flex min-h-screen items-center justify-center px-4">        
        <div className="max-w-md w-full rounded-lg p-6">
          {/* Buttons as navigation links */}
          <div className="flex flex-col space-y-4">
            <Link href="/register" className="block w-full">
              <button className="bg-white text-black font-medium py-4 px-6 rounded-full w-full">
                Registration
              </button>
            </Link>
            
            <Link href="/login" className="block w-full">
              <button className="bg-white text-black font-medium py-4 px-6 rounded-full w-full">
                Login
              </button>
            </Link>
            
            <Link href="/orders" className="block w-full mt-8">
              <button className="bg-white text-black font-medium py-4 px-6 rounded-full w-full">
                Orders
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}