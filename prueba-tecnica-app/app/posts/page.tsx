'use client';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { PostsService, Post } from '../services/posts';
import Link from 'next/link';

const fetcher = async (url: string) => {
  if (url === '/posts') return PostsService.getAllPosts();
  const userId = new URLSearchParams(url.split('?')[1]).get('userId');
  return userId ? PostsService.getPostsByUserId(userId) : [];
};

export default function PostsPage() {
  const [userId, setUserId] = useState<string>('');
  const [debouncedUserId, setDebouncedUserId] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const POSTS_PER_PAGE = 9;

  const url = debouncedUserId ? `?userId=${debouncedUserId}` : '/posts';
  const { data: posts, error, isLoading } = useSWR<Post[]>(url, fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 2000,
    loadingTimeout: 3000,
  });

  useEffect(() => {
    setCurrentPage(1); 
    const timer = setTimeout(() => {
      setDebouncedUserId(userId);
    }, 750);
    return () => clearTimeout(timer);
  }, [userId]);

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline"> Failed to load posts.</span>
      </div>
    </div>
  );

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  const totalPosts = posts?.length || 0;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const paginatedPosts = posts?.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE) || [];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Posts
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Browse our collection of posts
          </p>
        </div>
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Filter by User ID..."
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        {posts && posts.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            No results found for User Id {userId}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        User ID: {post.userId}
                      </span>
                      <span className="text-gray-500 text-sm">#{post.id}</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.body}
                    </p>
                    <div className="flex justify-end">
                      <Link href={`/posts/${post.id}`}>
                        <button className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200">
                          Read more →
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center mt-10 gap-2 flex-wrap">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded bg-gray-200 text-gray-700 font-semibold disabled:opacity-50"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded font-semibold ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded bg-gray-200 text-gray-700 font-semibold disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
