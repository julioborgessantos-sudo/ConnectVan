import React, { useState } from 'react';
import { Button } from '../components/Button';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';
import { UserRole } from '../types';
import { AlertCircle, CheckCircle, Truck } from 'lucide-react';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '', 
    type: 'CLIENT' 
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    if (formData.password.length < 6) {
        setError("A senha deve ter pelo menos 6 caracteres.");
        return;
    }

    setIsLoading(true);

    try {
      await authService.register(
        formData.name,
        formData.email,
        formData.password,
        formData.type as UserRole
      );
      setShowSuccessModal(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erro ao realizar cadastro. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center border-4 border-yellow-100">
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Cadastro Concluído!</h3>
            <p className="text-gray-600 mb-8">Conta criada com sucesso para <strong>{formData.name.split(' ')[0]}</strong>.</p>
            <Button onClick={handleGoToLogin} className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 text-lg">
              Acesse sua conta
            </Button>
          </div>
        </div>
      )}

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
            <div className="bg-yellow-400 p-3 rounded-xl mb-4">
                <Truck className="h-8 w-8 text-white" />
            </div>
        </div>
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Crie sua conta</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Já tem uma conta? <Link to="/login" className="font-medium text-yellow-600 hover:text-yellow-500">Faça login</Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                <p className="ml-3 text-sm text-red-700">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">Nome Completo</label>
              <input
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-900 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-900 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Senha</label>
                <input
                  type="password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-900 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirmar</label>
                <input
                  type="password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-900 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  value={formData.confirmPassword}
                  onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Eu sou:</label>
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value})}
              >
                <option value="CLIENT">Pai/Responsável</option>
                <option value="DRIVER">Motorista de Van</option>
                <option value="PARTNER">Parceiro Comercial</option>
              </select>
            </div>

            <Button type="submit" className="w-full" isLoading={isLoading}>Cadastrar</Button>
          </form>
        </div>
      </div>
    </div>
  );
};