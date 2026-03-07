/**
 * API Keys Management Page
 * Create, view, and revoke API keys
 */

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { createApiKey, listApiKeys, revokeApiKey, deleteApiKey } from '@/lib/api-keys/manager';
import { Copy, Eye, EyeOff, Trash2, AlertCircle } from 'lucide-react';
import { revalidatePath } from 'next/cache';

async function handleCreateKey(formData: FormData) {
  'use server';
  
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/auth/login');
  }
  
  const name = formData.get('name') as string;
  
  try {
    const { key } = await createApiKey(user.id, name || undefined);
    
    // Store the key in a temporary session/cookie so it can be shown once
    // For simplicity, we'll just redirect back and show a success message
    revalidatePath('/dashboard/api-keys');
    redirect(`/dashboard/api-keys?created=true&key=${key}`);
  } catch (error) {
    console.error('Failed to create API key:', error);
    revalidatePath('/dashboard/api-keys');
    redirect('/dashboard/api-keys?error=true');
  }
}

async function handleRevokeKey(formData: FormData) {
  'use server';
  
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/auth/login');
  }
  
  const keyId = formData.get('keyId') as string;
  
  try {
    await revokeApiKey(keyId, user.id);
    revalidatePath('/dashboard/api-keys');
  } catch (error) {
    console.error('Failed to revoke API key:', error);
  }
  
  redirect('/dashboard/api-keys');
}

async function handleDeleteKey(formData: FormData) {
  'use server';
  
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/auth/login');
  }
  
  const keyId = formData.get('keyId') as string;
  
  try {
    await deleteApiKey(keyId, user.id);
    revalidatePath('/dashboard/api-keys');
  } catch (error) {
    console.error('Failed to delete API key:', error);
  }
  
  redirect('/dashboard/api-keys');
}

export default async function ApiKeysPage({
  searchParams,
}: {
  searchParams: { created?: string; key?: string; error?: string };
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/auth/login');
  }
  
  const apiKeys = await listApiKeys(user.id);
  
  const newKey = searchParams.created === 'true' ? searchParams.key : null;
  const hasError = searchParams.error === 'true';
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">API Keys</h1>
        <p className="text-gray-600">
          Create and manage your API keys for authentication.
        </p>
      </div>
      
      {/* New Key Created Alert */}
      {newKey && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-green-900 mb-2">
                API Key Created Successfully
              </h3>
              <p className="text-sm text-green-800 mb-3">
                Make sure to copy your API key now. You won't be able to see it again!
              </p>
              <div className="bg-white border border-green-300 rounded p-3 mb-3">
                <code className="text-sm font-mono break-all">{newKey}</code>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(newKey)}
                className="flex items-center gap-2 text-sm bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                <Copy className="w-4 h-4" />
                Copy to Clipboard
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Error Alert */}
      {hasError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900 mb-1">
                Failed to Create API Key
              </h3>
              <p className="text-sm text-red-800">
                Something went wrong. Please try again.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Create New Key Form */}
      <div className="bg-white rounded-lg border p-6 mb-8">
        <h2 className="font-semibold mb-4">Create New API Key</h2>
        <form action={handleCreateKey} className="flex gap-3">
          <input
            type="text"
            name="name"
            placeholder="Key name (optional)"
            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Create Key
          </button>
        </form>
        <p className="text-sm text-gray-500 mt-2">
          Give your key a descriptive name to identify its purpose.
        </p>
      </div>
      
      {/* API Keys List */}
      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b">
          <h2 className="font-semibold">Your API Keys</h2>
        </div>
        
        {apiKeys.length > 0 ? (
          <div className="divide-y">
            {apiKeys.map((key) => (
              <div key={key.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">
                        {key.name || 'Unnamed Key'}
                      </h3>
                      {key.revokedAt && (
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                          Revoked
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 mb-1">
                      <span className="font-mono">{key.keyPrefix}••••••••••••••••</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Created {new Date(key.createdAt).toLocaleDateString('en-GB')}
                      {key.lastUsedAt && (
                        <> • Last used {new Date(key.lastUsedAt).toLocaleDateString('en-GB')}</>
                      )}
                    </div>
                  </div>
                  
                  {!key.revokedAt && (
                    <div className="flex gap-2">
                      <form action={handleRevokeKey}>
                        <input type="hidden" name="keyId" value={key.id} />
                        <button
                          type="submit"
                          className="text-sm text-orange-600 hover:text-orange-700 px-3 py-1 border border-orange-300 rounded hover:bg-orange-50"
                        >
                          Revoke
                        </button>
                      </form>
                      <form action={handleDeleteKey}>
                        <input type="hidden" name="keyId" value={key.id} />
                        <button
                          type="submit"
                          className="text-sm text-red-600 hover:text-red-700 px-3 py-1 border border-red-300 rounded hover:bg-red-50 flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-gray-500">
            <p className="mb-4">No API keys yet</p>
            <p className="text-sm">Create your first API key to start using the Screenshot API</p>
          </div>
        )}
      </div>
      
      {/* Security Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div className="text-sm">
            <h3 className="font-semibold text-yellow-900 mb-1">
              Keep your API keys secure
            </h3>
            <ul className="text-yellow-800 space-y-1 list-disc list-inside">
              <li>Never share your API keys publicly</li>
              <li>Don't commit them to version control</li>
              <li>Revoke any keys you suspect have been compromised</li>
              <li>Use environment variables to store keys in your applications</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
