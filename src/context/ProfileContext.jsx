import { createContext, use, useState } from "react";

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [businessProfile, setBusinessProfile] = useState({
    name: "",
    industry: "",
  });
  const [memberProfile, setMemberProfile] = useState({
    empStatus: "",
    firstName: "",
    lastName: "",
    jobTitle: "",
    employer: "",
  });

  return (
    <ProfileContext.Provider
      value={{
        businessProfile,
        setBusinessProfile,
        memberProfile,
        setMemberProfile,
      }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfileCtx() {
  return use(ProfileContext);
}
