'use client';
import { handleSignOut } from '@/lib/actions';

export function SignOut() {
  return (
    <form action={handleSignOut}>
      <button type="submit">Sign Out</button>
    </form>
  );
}
