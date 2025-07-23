import Link from 'next/link';
import Button from '@/components/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <span className="text-4xl font-bold text-gray-400">404</span>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Page not found</h2>
          <p className="text-gray-600 mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <Link href="/" className="block">
            <Button className="w-full">
              Go back home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
