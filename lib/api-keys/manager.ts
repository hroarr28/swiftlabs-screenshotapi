/**
 * API Key Management
 * 
 * Handles creation, validation, and management of API keys for Screenshot API
 */

import crypto from 'crypto';
import { createClient } from '@/lib/supabase/server';

export interface ApiKey {
  id: string;
  userId: string;
  keyPrefix: string;
  name: string | null;
  lastUsedAt: string | null;
  createdAt: string;
  revokedAt: string | null;
}

const KEY_PREFIX = 'sk_live_';

/**
 * Generate a new API key
 * Format: sk_live_[32 random chars]
 */
export function generateApiKey(): { key: string; hash: string; prefix: string } {
  // Generate 32 random bytes and convert to hex (64 chars)
  const randomPart = crypto.randomBytes(32).toString('hex');
  const key = `${KEY_PREFIX}${randomPart}`;
  
  // Hash the key for storage (never store plain key)
  const hash = crypto.createHash('sha256').update(key).digest('hex');
  
  // Prefix for display (first 12 chars)
  const prefix = key.substring(0, 12);
  
  return { key, hash, prefix };
}

/**
 * Create a new API key for a user
 */
export async function createApiKey(
  userId: string,
  name?: string
): Promise<{ key: string; id: string }> {
  const supabase = await createClient();
  
  // Generate key
  const { key, hash, prefix } = generateApiKey();
  
  // Store in database
  const { data, error } = await supabase
    .from('api_keys')
    .insert({
      user_id: userId,
      key_hash: hash,
      key_prefix: prefix,
      name: name || null,
    })
    .select('id')
    .single();
  
  if (error) {
    throw new Error(`Failed to create API key: ${error.message}`);
  }
  
  // Return the plain key (only time it's shown to user)
  return { key, id: data.id };
}

/**
 * Validate an API key and return user ID
 * Also updates last_used_at timestamp
 */
export async function validateApiKey(key: string): Promise<string | null> {
  // Quick format check
  if (!key.startsWith(KEY_PREFIX)) {
    return null;
  }
  
  const supabase = await createClient();
  
  // Hash the provided key
  const hash = crypto.createHash('sha256').update(key).digest('hex');
  
  // Look up in database
  const { data, error } = await supabase
    .from('api_keys')
    .select('user_id, revoked_at')
    .eq('key_hash', hash)
    .single();
  
  if (error || !data) {
    return null;
  }
  
  // Check if revoked
  if (data.revoked_at) {
    return null;
  }
  
  // Update last_used_at (fire and forget, don't await)
  supabase
    .from('api_keys')
    .update({ last_used_at: new Date().toISOString() })
    .eq('key_hash', hash)
    .then(() => {}, () => {}); // Ignore errors on update
  
  return data.user_id;
}

/**
 * List all API keys for a user
 */
export async function listApiKeys(userId: string): Promise<ApiKey[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('api_keys')
    .select('id, user_id, key_prefix, name, last_used_at, created_at, revoked_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) {
    throw new Error(`Failed to list API keys: ${error.message}`);
  }
  
  return (data || []).map(row => ({
    id: row.id,
    userId: row.user_id,
    keyPrefix: row.key_prefix,
    name: row.name,
    lastUsedAt: row.last_used_at,
    createdAt: row.created_at,
    revokedAt: row.revoked_at,
  }));
}

/**
 * Revoke an API key
 */
export async function revokeApiKey(keyId: string, userId: string): Promise<void> {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('api_keys')
    .update({ revoked_at: new Date().toISOString() })
    .eq('id', keyId)
    .eq('user_id', userId); // Ensure user owns the key
  
  if (error) {
    throw new Error(`Failed to revoke API key: ${error.message}`);
  }
}

/**
 * Delete an API key permanently
 */
export async function deleteApiKey(keyId: string, userId: string): Promise<void> {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('api_keys')
    .delete()
    .eq('id', keyId)
    .eq('user_id', userId); // Ensure user owns the key
  
  if (error) {
    throw new Error(`Failed to delete API key: ${error.message}`);
  }
}

/**
 * Authenticate request using Bearer token
 * Extract API key from Authorization header
 */
export function extractApiKey(authHeader: string | null): string | null {
  if (!authHeader) {
    return null;
  }
  
  // Format: "Bearer sk_live_..."
  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  return match ? match[1] : null;
}
