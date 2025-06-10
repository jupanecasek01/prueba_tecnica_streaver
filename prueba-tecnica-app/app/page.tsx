'use client';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="text-center max-w-xl">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 mb-4">
          Welcome to Posts Web App
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Discover posts from different users
        </p>

        <div className="flex justify-center mb-10">
        <img
    src="https://cdn-icons-png.flaticon.com/512/3131/3131611.png"
    alt="Posts icon"
    className="w-32 h-32"
        />
        </div>

        <Link href="/posts">
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-md">
            Explore posts →
          </button>
        </Link>
      </div>
    </main>
  );
}