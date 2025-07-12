import { Search, Filter } from 'lucide-react';

const SearchAndFilter = ({ 
  searchTerm, 
  onSearchChange, 
  selectedAvailability, 
  onAvailabilityChange, 
  availabilityOptions 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Bar */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by skills offered or wanted..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
          />
        </div>

        {/* Availability Filter */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={selectedAvailability}
            onChange={(e) => onAvailabilityChange(e.target.value)}
            className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white min-w-[160px]"
          >
            {availabilityOptions.map((option) => (
              <option key={option} value={option}>
                {option === "All" ? "All Availability" : option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;