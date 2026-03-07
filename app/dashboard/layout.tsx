/**
 * Dashboard Layout
 * Authenticated area with sidebar navigation
 */

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { BarChart3, Key, FileText, Settings, LogOut } from 'lucide-react';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/auth/login');
  }
  
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="font-bold text-sm">S</span>
            </div>
            <span className="font-bold">Screenshot API</span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 mb-1"
          >
            <BarChart3 className="w-5 h-5" />
            <span>Overview</span>
          </Link>
          
          <Link
            href="/dashboard/api-keys"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 mb-1"
          >
            <Key className="w-5 h-5" />
            <span>API Keys</span>
          </Link>
          
          <Link
            href="/docs"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 mb-1"
          >
            <FileText className="w-5 h-5" />
            <span>Documentation</span>
          </Link>
          
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 mb-1"
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>
        </nav>
        
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
              <span className="font-semibold text-sm">
                {user.email?.[0].toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{user.email}</div>
              <div className="text-xs text-gray-400">Free Plan</div>
            </div>
          </div>
          
          <form action="/auth/logout" method="post">
            <button
              type="submit"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white w-full"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </form>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
