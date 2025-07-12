import { useState, useMemo } from 'react';
import Header from './components/Header';
import UserCard from './components/UserCard';
import SearchAndFilter from './components/SearchAndFilter';
import Pagination from './components/Pagination';
import LoginModal from './components/LoginModal';
import SwapModal from './components/SwapModal';
import { mockUsers, availabilityOptions } from './data/mockUsers';
import './App.css';

function App() {
  // Authentication state
  const [currentUser, setCurrentUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  // Modal states
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('All');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;

  // Filter users based on search and availability
  const filteredUsers = useMemo(() => {
    return mockUsers.filter(user => {
      if (!user.isPublic) return false;
      
      // Search filter
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = searchTerm === '' || 
        user.skillsOffered.some(skill => skill.toLowerCase().includes(searchLower)) ||
        user.skillsWanted.some(skill => skill.toLowerCase().includes(searchLower)) ||
        user.name.toLowerCase().includes(searchLower);
      
      // Availability filter
      const matchesAvailability = selectedAvailability === 'All' || 
        user.availability === selectedAvailability;
      
      return matchesSearch && matchesAvailability;
    });
  }, [searchTerm, selectedAvailability]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  // Reset to first page when filters change
  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleAvailabilityChange = (availability) => {
    setSelectedAvailability(availability);
    setCurrentPage(1);
  };

  // Authentication handlers
  const handleLogin = (userData) => {
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  // Request button handler
  const handleRequestClick = (user, isLoggedIn) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      setSelectedUser(user);
      setShowSwapModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header 
        currentUser={currentUser}
        onLogout={handleLogout}
        onLoginClick={() => setShowLoginModal(true)}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Discover Skill Exchange Partners
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with talented individuals to exchange skills and grow together. 
            Find someone who can teach you what you want to learn, and share your expertise in return.
          </p>
        </div>

        {/* Search and Filter */}
        <SearchAndFilter
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          selectedAvailability={selectedAvailability}
          onAvailabilityChange={handleAvailabilityChange}
          availabilityOptions={availabilityOptions}
        />

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {paginatedUsers.length} of {filteredUsers.length} skill exchange partners
          </p>
        </div>

        {/* User Grid */}
        {paginatedUsers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {paginatedUsers.map(user => (
              <UserCard
                key={user.id}
                user={user}
                onRequestClick={handleRequestClick}
                isLoggedIn={!!currentUser}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No skill exchange partners found matching your criteria.
            </p>
            <p className="text-gray-400 mt-2">
              Try adjusting your search terms or filters.
            </p>
          </div>
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </main>

      {/* Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />

      <SwapModal
        isOpen={showSwapModal}
        onClose={() => setShowSwapModal(false)}
        user={selectedUser}
        currentUser={currentUser}
      />
    </div>
  );
}

export default App;