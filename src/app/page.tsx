import Header from '@/components/header';

export default function Home() {
  return (
    <div className="bg-gray-950 min-h-screen text-white flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center px-4">        
        <div className="max-w-md w-full rounded-lg p-6">
          {/* Buttons */}
          <div className="flex flex-col space-y-4">
            <button className="bg-white text-black font-medium py-4 px-6 rounded-full">
              Registration
            </button>
            <button className="bg-white text-black font-medium py-4 px-6 rounded-full">
              Login
            </button>
            <button className="bg-white text-black font-medium py-4 px-6 rounded-full mt-8">
              Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}