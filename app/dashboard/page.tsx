/**
 * Dashboard Overview Page
 * Shows usage statistics, quota, and recent activity
 */

import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { BarChart3, TrendingUp, Calendar, ArrowRight } from 'lucide-react';

export default async function DashboardPage() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return null;
  }
  
  // Get subscription details
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('tier, screenshots_included, screenshots_used')
    .eq('user_id', user.id)
    .single();
  
  // Get recent usage (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const { data: recentUsage } = await supabase
    .from('screenshot_usage')
    .select('*')
    .eq('user_id', user.id)
    .gte('created_at', thirtyDaysAgo.toISOString())
    .order('created_at', { ascending: false })
    .limit(10);
  
  // Get API keys count
  const { count: apiKeysCount } = await supabase
    .from('api_keys')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .is('revoked_at', null);
  
  const included = subscription?.screenshots_included || 0;
  const used = subscription?.screenshots_used || 0;
  const remaining = Math.max(0, included - used);
  const percentUsed = included > 0 ? Math.round((used / included) * 100) : 0;
  
  const nextResetDate = new Date();
  nextResetDate.setMonth(nextResetDate.getMonth() + 1);
  nextResetDate.setDate(1);
  
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back! Here's your API usage overview.
          </p>
        </div>
        <Link
          href="/dashboard/api-keys"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Create API Key
        </Link>
      </div>
      
      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Usage */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-600">Screenshots Used</h3>
            <BarChart3 className="w-5 h-5 text-blue-600" />
          </div>
          <div className="mb-4">
            <div className="text-3xl font-bold mb-1">
              {used.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">
              of {included.toLocaleString()} included
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${Math.min(percentUsed, 100)}%` }}
            />
          </div>
        </div>
        
        {/* Remaining */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-600">Remaining</h3>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <div className="mb-4">
            <div className="text-3xl font-bold mb-1">
              {remaining.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">
              screenshots left
            </div>
          </div>
          {remaining < included * 0.2 && (
            <div className="text-sm text-orange-600 font-medium">
              Running low! Consider upgrading.
            </div>
          )}
        </div>
        
        {/* Reset Date */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-600">Reset Date</h3>
            <Calendar className="w-5 h-5 text-gray-600" />
          </div>
          <div className="mb-4">
            <div className="text-3xl font-bold mb-1">
              {nextResetDate.getDate()}
            </div>
            <div className="text-sm text-gray-500">
              {nextResetDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Quota resets monthly
          </div>
        </div>
      </div>
      
      {/* Current Plan */}
      <div className="bg-white rounded-lg border p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold mb-1">Current Plan</h3>
            <p className="text-sm text-gray-600 mb-4">
              You're on the <span className="font-semibold capitalize">{subscription?.tier || 'Free'}</span> plan
            </p>
            <div className="flex items-center gap-6 text-sm">
              <div>
                <span className="text-gray-600">API Keys:</span>{' '}
                <span className="font-semibold">{apiKeysCount || 0}</span>
              </div>
              <div>
                <span className="text-gray-600">Monthly Quota:</span>{' '}
                <span className="font-semibold">{included.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-gray-600">Rate Limit:</span>{' '}
                <span className="font-semibold">60/min</span>
              </div>
            </div>
          </div>
          {subscription?.tier === 'free' && (
            <Link
              href="/pricing"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              Upgrade Plan
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b">
          <h3 className="font-semibold">Recent Screenshots</h3>
        </div>
        
        {recentUsage && recentUsage.length > 0 ? (
          <div className="divide-y">
            {recentUsage.map((item) => (
              <div key={item.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate mb-1">
                      {item.url}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{item.format.toUpperCase()}</span>
                      <span>{item.viewport_width}×{item.viewport_height}px</span>
                      <span>{(item.file_size / 1024).toFixed(1)} KB</span>
                      <span>{item.duration_ms}ms</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 ml-4">
                    {new Date(item.created_at).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-gray-500">
            <p className="mb-4">No screenshots captured yet</p>
            <Link
              href="/docs"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Read the docs to get started →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
