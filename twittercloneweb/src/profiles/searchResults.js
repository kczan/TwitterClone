import React, { useState, useEffect } from "react";
import { ProfileBadgeComponent } from "./badge";
import { apiGetProfileSearchResults } from "./lookup";

export function ProfileSearchResults(props) {
  const { username } = props;

  const [profilesInit, setProfilesInit] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [profilesDidSet, setProfilesDidSet] = useState(false);

  useEffect(() => {
    if (profilesDidSet === false) {
      const handleProfilesRefresh = (response, status) => {
        if (status === 200) {
          setNextUrl(response.next);
          setProfilesDidSet(true);
          setProfilesInit(response.results);
        }
      };
      apiGetProfileSearchResults(username, handleProfilesRefresh);
    }
  }, [setProfilesDidSet, profilesDidSet, setProfilesInit, username]);

  const handleLoadNext = (event) => {
    event.preventDefault();
    if (nextUrl !== null) {
      const handleLoadNextResponse = (response, status) => {
        if (status === 200) {
          setNextUrl(response.next);
          setProfiles(profiles);
        }
      };
      apiGetProfileSearchResults(username, handleLoadNextResponse, nextUrl);
    }
  };
  return (
    <React.Fragment>
      {profilesInit.map((profile) => {
        return (
          <ProfileBadgeComponent username={profile.username} inSearch={true} />
        );
      })}
      {nextUrl !== null && (
        <button onClick={handleLoadNext} className="btn btn-outline-primary">
          Load next
        </button>
      )}
    </React.Fragment>
  );
}
