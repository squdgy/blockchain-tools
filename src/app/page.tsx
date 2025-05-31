import Image from "next/image";
import BitcoinAddressValidator from '@/components/BitcoinAddressValidator';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Blockchain Tools
          </h1>
          <p className="text-xl text-gray-600">
            A collection of useful tools for blockchain developers and enthusiasts
          </p>
        </div>
        
        <div className="bg-white shadow rounded-lg">
          <BitcoinAddressValidator />
        </div>
      </div>
    </main>
  );
}
