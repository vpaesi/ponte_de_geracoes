import React, { useState } from "react";
import { User } from "../types";
import { UserContext } from "../contexts/UserContext";

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUserState] = useState<User>({
    id: null,
    userType: "default",
    name: "",
    email: "",
  });

  const setUser = (newUser: User) => {
    setUserState(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const clearUser = () => {
    setUserState({ id: null, userType: "default", name: "", email: "" });
    localStorage.removeItem("user");
  };

  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserState(JSON.parse(storedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};
