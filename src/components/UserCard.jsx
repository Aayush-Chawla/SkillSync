import { Star, User } from 'lucide-react';

const UserCard = ({ user, onRequestClick, isLoggedIn }) => {
  const handleRequestClick = () => {
    onRequestClick(user, isLoggedIn);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
      <div className="flex flex-col items-center text-center">
        {/* Profile Photo */}
        <div className="relative mb-4">
          {user.profilePhoto ? (
            <img
              src={user.profilePhoto}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-blue-100"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-200 border-4 border-blue-100 flex items-center justify-center">
              <User className="w-8 h-8 text-gray-400" />
            </div>
          )}
        </div>

        {/* Name */}
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{user.name}</h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          {renderStars(user.rating)}
          <span className="text-sm text-gray-600 ml-1">({user.rating})</span>
        </div>

        {/* Skills Offered */}
        <div className="mb-4 w-full">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Skills Offered</h4>
          <div className="flex flex-wrap gap-1 justify-center">
            {user.skillsOffered.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Skills Wanted */}
        <div className="mb-6 w-full">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Skills Wanted</h4>
          <div className="flex flex-wrap gap-1 justify-center">
            {user.skillsWanted.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Request Button */}
        <button
          onClick={handleRequestClick}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Request Skill Swap
        </button>
      </div>
    </div>
  );
};

export default UserCard;