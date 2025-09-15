import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/auth/LoginForm';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (user: any, token: string) => {
    login(user, token);
    // Navigate based on user role
    if (user.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        <LoginForm onLogin={handleLogin} />
      </div>
    </div>
  );
};

export default Login;
