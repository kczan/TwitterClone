import React, { useState, useEffect } from "react";
import { apiGetProfile, apiProfileFollowToggle } from "./lookup";
import { UserPicture } from "./components";
import { DisplayCount } from "./utilities";

function ProfileBadge(props) {
  const { user, didFollowToggle, profileLoading, inSearch } = props;
  let currentLabel = user && user.is_following ? "Unfollow" : "Follow";
  currentLabel = profileLoading ? "Loading..." : currentLabel;

  let bioSectionClass = "p-2 bg-light";

  !inSearch && (bioSectionClass += " w-25");

  const handleFollowToggle = (event) => {
    event.preventDefault();
    if (didFollowToggle && !profileLoading) {
      didFollowToggle(currentLabel);
    }
  };
  return user ? (
    <div className="m-3 p-2">
      <a
        {...(inSearch ? { href: `/profile/${user.username}` } : {})}
        className="nounderline"
      >
        <div>
          <UserPicture author={user} />
          <div className="pt-3 ml-1">
            {user.first_name} {user.last_name}{" "}
          </div>
          <div className="ml-1 text-muted small">@{user.username}</div>
          <section id="bio-section" className={bioSectionClass}>
            <p className="d-inline pr-3">
              <DisplayCount>{user.follower_count}</DisplayCount>
              {user.followers_count === 1 ? "follower" : "followers"}
            </p>
            {"|"}
            <p className="d-inline pl-3">
              <DisplayCount>{user.following_count}</DisplayCount> followed
            </p>
            <p className="text-truncate font-italic pt-2">{user.bio}</p>
          </section>
        </div>
      </a>
      <button className="btn btn-primary" onClick={handleFollowToggle}>
        {currentLabel}
      </button>
    </div>
  ) : null;
}

export function ProfileBadgeComponent(props) {
  const { username, inSearch } = props;
  const [didLookup, setDidLookup] = useState(false);
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);

  const handleBackendLookup = (response, status) => {
    if (status === 200) {
      setProfile(response);
    }
  };
  useEffect(() => {
    if (didLookup === false) {
      setDidLookup(true);
      apiGetProfile(username, handleBackendLookup);
    }
  }, [didLookup, setDidLookup, username]);

  const handleNewFollow = (actionVerb) => {
    apiProfileFollowToggle(username, actionVerb, (response, status) => {
      if (status === 200) {
        setProfile(response);
      }
      setProfileLoading(false);
    });
    setProfileLoading(true);
  };
  return didLookup === false
    ? "Loading..."
    : profile && (
        <ProfileBadge
          user={profile}
          didFollowToggle={handleNewFollow}
          profileLoading={profileLoading}
          inSearch={inSearch}
        />
      );
}
