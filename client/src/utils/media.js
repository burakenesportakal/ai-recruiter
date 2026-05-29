import axios from 'axios';

export function getAvatarUrl(avatarPath) {
  if (!avatarPath) return null;
  if (avatarPath.startsWith('http')) return avatarPath;
  const base = (axios.defaults.baseURL || '').replace(/\/$/, '');
  const path = avatarPath.startsWith('/') ? avatarPath : `/${avatarPath}`;
  return `${base}${path}`;
}
