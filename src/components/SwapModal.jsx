import { X, MessageCircle, Calendar, Clock } from 'lucide-react';

const SwapModal = ({ isOpen, onClose, user, currentUser }) => {
  if (!isOpen || !user) return null;

  const handleSendRequest = () => {
    // Mock sending request - in real app, this would call an API
    alert(`Skill swap request sent to ${user.name}!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            Request Skill Swap
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* User Info */}
          <div className="flex items-center gap-4 mb-6">
            <img
              src={user.profilePhoto}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
              <p className="text-gray-600">Rating: {user.rating}/5</p>
            </div>
          </div>

          {/* Skills Exchange */}
          <div className="mb-6">
            <h4 className="text-lg font-medium text-gray-800 mb-3">Skill Exchange</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="mb-3">
                <p className="text-sm font-medium text-gray-700 mb-1">They can teach you:</p>
                <div className="flex flex-wrap gap-1">
                  {user.skillsOffered.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">They want to learn:</p>
                <div className="flex flex-wrap gap-1">
                  {user.skillsWanted.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MessageCircle className="w-4 h-4 inline mr-1" />
              Message (optional)
            </label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              rows="3"
              placeholder="Introduce yourself and explain what you'd like to learn or teach..."
            />
          </div>

          {/* Availability */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-2">
              <Clock className="w-4 h-4 inline mr-1" />
              Their availability: <span className="text-blue-600">{user.availability}</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSendRequest}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
            >
              Send Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwapModal;