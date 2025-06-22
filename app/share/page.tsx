'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { shareApi, type StudentData } from '@/lib/api';
import { 
  Search, 
  GraduationCap, 
  AlertCircle, 
  Users, 
  Mail,
  BookOpen,
  Award,
  Code
} from 'lucide-react';

export default function SharePage() {
  const [data, setData] = useState<StudentData[]>([]);
  const [filteredData, setFilteredData] = useState<StudentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [emailFilter, setEmailFilter] = useState('');
  
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setError('Invalid share link. No token provided.');
      setLoading(false);
      return;
    }

    fetchSharedData();
  }, [token]);

  useEffect(() => {
    if (!emailFilter.trim()) {
      setFilteredData(data);
    } else {
      const filtered = data.filter(student =>
        student.email?.toLowerCase().includes(emailFilter.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [data, emailFilter]);

  const fetchSharedData = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await shareApi.getSharedData(token!);
      setData(response);
      setFilteredData(response);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load shared data');
    } finally {
      setLoading(false);
    }
  };

  const stats = useMemo(() => {
    if (!data.length) return null;
    
    const totalStudents = data.length;
    const avgCGPA = data.reduce((sum, student) => sum + (student.cgpa || 0), 0) / totalStudents;
    const courses = Array.from(new Set(data.map(student => student.course).filter(Boolean)));
    const years = Array.from(new Set(data.map(student => student.year).filter(Boolean)));
    
    return {
      totalStudents,
      avgCGPA: avgCGPA.toFixed(2),
      coursesCount: courses.length,
      yearsCount: years.length
    };
  }, [data]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading student data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Error</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  console.log(filteredData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center">
            <GraduationCap className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">
              DTU Student Data Portal
            </h1>
          </div>
          <p className="text-center text-gray-600 mt-2">
            Shared student information for recruitment and placement activities
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      {stats && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
              <p className="text-sm text-gray-600">Total Students</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <Award className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{stats.avgCGPA}</p>
              <p className="text-sm text-gray-600">Avg CGPA</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <BookOpen className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{stats.coursesCount}</p>
              <p className="text-sm text-gray-600">Courses</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <GraduationCap className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{stats.yearsCount}</p>
              <p className="text-sm text-gray-600">Years</p>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label htmlFor="email-filter" className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Email
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email-filter"
                  type="text"
                  value={emailFilter}
                  onChange={(e) => setEmailFilter(e.target.value)}
                  placeholder="Search by email address..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="text-sm text-gray-600 pt-6">
              Showing {filteredData.length} of {data.length} students
            </div>
          </div>
        </div>

        {/* Student Data Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {filteredData.length === 0 ? (
            <div className="p-8 text-center">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Students Found
              </h3>
              <p className="text-gray-600">
                {emailFilter ? 'No students match your search criteria.' : 'No student data available.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Roll No.
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      CGPA
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.map((student, index) => (
                    <tr key={student.id || index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-sm font-medium text-blue-800">
                                {student.first_name?.charAt(0).toUpperCase() || 'S'}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {student.first_name + " " + student.last_name || 'N/A'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {student.roll_no || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Award className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm font-medium text-gray-900">
                            {student.cgpa ? student.cgpa.toFixed(2) : 'N/A'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500 flex items-center">
                            {student.email || 'N/A'}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            This data is shared securely for recruitment and placement purposes only.
          </p>
        </div>
      </div>
    </div>
  );
}