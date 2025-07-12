import { Users, LogOut, User } from 'lucide-react';

const Header = ({ currentUser, onLogout, onLoginClick }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Users className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">SkillSwap</h1>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            {currentUser ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700 font-medium">{currentUser.name}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Login / Sign Up
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;