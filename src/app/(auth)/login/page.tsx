'use client';

import { useRouter } from 'next/navigation';
import AuthForm from '@/features/auth/components/auth-form';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { PageTransition } from '@/components/animations';

export default function LoginPage() {
  const router = useRouter();
  const { login, register, isLoading, error, clearError } = useAuth();

  const handleClose = () => {
    router.push('/');
  };

  return (
    <PageTransition direction="right">
      <AuthForm
        initialView="login"
        onLogin={login}
        onRegister={register}
        onClose={handleClose}
        isLoading={isLoading}
        error={error}
        clearError={clearError}
      />
    </PageTransition>
  );
}