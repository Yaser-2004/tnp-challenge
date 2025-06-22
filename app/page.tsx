'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { GraduationCap, Users, Shield } from 'lucide-react';

export default function HomePage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        router.push('/admin');
      } else {
        router.push('/login');
      }
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <GraduationCap className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            DTU Training & Placement
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Secure Data Sharing Platform
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Student Data</h3>
            <p className="text-gray-600">
              Comprehensive student information management for placement activities.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Secure Sharing</h3>
            <p className="text-gray-600">
              Generate secure, time-limited links for external data sharing.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <GraduationCap className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Admin Control</h3>
            <p className="text-gray-600">
              Full administrative control over data access and sharing permissions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}