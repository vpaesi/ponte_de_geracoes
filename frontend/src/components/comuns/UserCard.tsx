import React from "react";
import ProfileImage from "./ProfileImage";
import UserTypeLabel from "./UserTypeLabel";
import StatusBadge from "./StatusBadge";
import AvailableDays from "./AvailableDays";
import type { User } from "../../types";

interface UserCardProps {
  user: User;
  userType: "ajudante" | "assistido";
  calculateAge: (birthDate?: string) => number;
  className?: string;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  userType,
  calculateAge,
  className = "",
}) => {
  const isHelper = userType === "ajudante";

  return (
    <div
      className={`
      glass-card overflow-hidden hover:shadow-xl 
      transition-all duration-300 transform hover:-translate-y-1 
      bg-white ${className} border border-gray-200 rounded-lg
    `}
    >
      <div className="p-6 pb-0 flex justify-center">
        <div className="relative">
          <ProfileImage
            src={user.profileImageUrl}
            alt={user.nome || "Usuário sem nome"}
            size="xl"
          />
          <div className="absolute top-0 right-0">
            <UserTypeLabel userType={userType} />
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="text-center">
          <h3 className="text-xl font-bold text-accent-800 mb-1">
            {user.nome}
          </h3>
          <p className="text-accent-600">{calculateAge(user.birthDate)} anos</p>
        </div>

        {user.address && (
          <div className="text-center">
            <p className="text-sm text-accent-600">📍 {user.address.city}/RS</p>
          </div>
        )}

        {user.aboutYou && (
          <div>
            <p className="text-sm text-accent-700 text-center line-clamp-3">
              {user.aboutYou}
            </p>
          </div>
        )}

        {(user.skills || user.needs) && (
          <div>
            <h4 className="text-sm font-semibold text-accent-700 mb-2">
              {isHelper ? "Habilidades:" : "Necessidades:"}
            </h4>
            <p className="text-sm text-accent-600 line-clamp-2">
              {user.skills || user.needs}
            </p>
          </div>
        )}

        <AvailableDays days={user.availableDays || []} />

        <div className="flex justify-center">
          <StatusBadge available={user.available ?? false} />
        </div>
      </div>
    </div>
  );
};

export default UserCard;
