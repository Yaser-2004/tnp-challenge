'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { shareApi } from '@/lib/api';
import { 
  Share2, 
  Copy, 
  CheckCircle, 
  LogOut, 
  GraduationCap, 
  AlertCircle,
  ExternalLink 
} from 'lucide-react';

export default function AdminPage() {
  const [shareToken, setShareToken] = useState('');
  const [shareUrl, setShareUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState('');
  const { isAuthenticated, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  const generateShareLink = async () => {
    setIsGenerating(true);
    setError('');

    try {
      const response = await shareApi.generateShareToken();
      const token = response.shareToken;
      setShareToken(token);
      
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
      const url = `${baseUrl}/share?token=${token}`;
      setShareUrl(url);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to generate share link');
    } finally {
      setIsGenerating(false);
    }
  };
 
  //
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard', err);
    }
  };

  const openShareLink = () => {
    window.open(shareUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">
                DTU T&P Admin Panel
              </h1>
            </div>
            <button
              onClick={logout}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Generate Shareable Data Link
          </h2>
          <p className="text-lg text-gray-600">
            Create secure links to share student data with external parties
          </p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center max-w-2xl mx-auto">
            <AlertCircle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Share2 className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">
              Click the button below to generate a new shareable link for student data
            </p>
          </div>

          <div className="space-y-6">
            <button
              onClick={generateShareLink}
              disabled={isGenerating}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg font-medium"
            >
              {isGenerating ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Generating Link...
                </div>
              ) : (
                'Generate Shareable Link'
              )}
            </button>

            {shareUrl && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Generated Share Link
                </h3>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 font-mono break-all pr-4">
                      {shareUrl}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={copyToClipboard}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    {isCopied ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Link
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={openShareLink}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Link
                  </button>
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> This link provides public access to student data. 
                    Share it only with authorized personnel and external parties who need access.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-12 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Secure Access
            </h3>
            <p className="text-gray-600">
              Generated links use cryptographically signed tokens for secure data access.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Login Required
            </h3>
            <p className="text-gray-600">
              Recipients can access shared data directly without needing to create accounts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}