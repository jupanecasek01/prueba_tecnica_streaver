import { PostsService, Post } from '../../services/posts';
import { notFound } from 'next/navigation';

interface PostDetailPageProps {
  params: { id: string };
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const postId = Number(params.id);
  let post: Post | null = null;
  try {
    post = await PostsService.getPostById(postId);
  } catch (e) {
    notFound();
  }
  if (!post) return notFound();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">{post.title}</h1>
        <div className="mb-2 text-sm text-gray-500">Post ID: {post.id} | User ID: {post.userId}</div>
        <p className="text-gray-700 text-lg mb-8 whitespace-pre-line">{post.body}</p>
        <a href="/posts" className="text-blue-600 hover:underline">← Back to posts</a>
      </div>
    </div>
  );
} 