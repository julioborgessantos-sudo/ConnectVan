import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserRole, User } from '../types';
import { Button } from './Button';
import { Truck, Menu, X, User as UserIcon, Shield } from 'lucide-react';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="bg-yellow-400 p-2 rounded-lg mr-2">
                <Truck className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900">Van<span className="text-yellow-500">Connect</span></span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Início
              </Link>
              
              <Link to="/plans" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Planos
              </Link>
              
              {/* Links Motorista */}
              {user?.role === UserRole.DRIVER && (
                <>
                  <Link to="/dashboard" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Meu Painel
                  </Link>
                  <Link to="/partners-area" className="border-transparent text-blue-600 hover:text-blue-800 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Clube de Benefícios
                  </Link>
                </>
              )}

              {/* Links Parceiros e Clientes também vêm Benefícios */}
              {(user?.role === UserRole.PARTNER || user?.role === UserRole.CLIENT) && (
                <Link to="/partners-area" className="border-transparent text-blue-600 hover:text-blue-800 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Parceiros e Descontos
                </Link>
              )}

              {/* Link Admin */}
              {user?.role === UserRole.ADMIN && (
                <Link to="/admin" className="border-transparent text-red-600 hover:text-red-800 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Painel Admin
                </Link>
              )}
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex flex-col text-right mr-2">
                   <span className="text-sm font-semibold text-gray-900">{user.name}</span>
                   <span className="text-xs text-gray-500 bg-gray-100 px-2 rounded-full inline-block text-center border border-gray-200">
                     {user.role === UserRole.DRIVER ? 'Motorista' : 
                      user.role === UserRole.ADMIN ? 'Administrador' :
                      user.role === UserRole.PARTNER ? 'Parceiro' : 'Responsável'}
                   </span>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogoutClick}>Sair</Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/register">
                   <Button variant="ghost" size="sm">Cadastrar</Button>
                </Link>
                <Link to="/login">
                   <Button variant="primary" size="sm">Entrar</Button>
                </Link>
              </div>
            )}
          </div>

          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-100">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/" className="bg-yellow-50 border-yellow-500 text-yellow-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
              Início
            </Link>
            
            <Link to="/plans" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
              Planos
            </Link>
            
            {user?.role === UserRole.DRIVER && (
              <Link to="/dashboard" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                Meu Painel
              </Link>
            )}

            {(user?.role === UserRole.DRIVER || user?.role === UserRole.PARTNER || user?.role === UserRole.CLIENT) && (
              <Link to="/partners-area" className="border-transparent text-blue-600 hover:bg-blue-50 hover:text-blue-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                Benefícios
              </Link>
            )}

            {user?.role === UserRole.ADMIN && (
              <Link to="/admin" className="border-transparent text-red-600 hover:bg-red-50 hover:text-red-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                Painel Admin
              </Link>
            )}
          </div>

          <div className="pt-4 pb-4 border-t border-gray-200">
            {user ? (
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <UserIcon className="h-10 w-10 rounded-full bg-gray-100 p-2" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user.name}</div>
                  <div className="text-sm font-medium text-gray-500">{user.email}</div>
                </div>
                <button onClick={handleLogoutClick} className="ml-auto flex-shrink-0 p-1 text-red-500 hover:text-red-700">
                  Sair
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 px-4">
                <Link to="/login" className="w-full">
                  <Button variant="primary" className="w-full">Entrar</Button>
                </Link>
                <Link to="/register" className="w-full">
                  <Button variant="outline" className="w-full">Criar Conta</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};