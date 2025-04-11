'use client';
import { handleSignIn } from '@/lib/actions';

export function SignIn() {
  return (
    <form action={handleSignIn}>
      <button type="submit">Sign In</button>
    </form>
  );
}
