import React from "react";

export function UserLink(props) {
  let { author, includeFullName } = props;
  author = author ? author : {};
  const nameDisplay =
    includeFullName && `${author.first_name} ${author.last_name} `;

  const handleUserLink = (event) => {
    event.preventDefault();
    window.location.href = `/profile/${author.username}`;
  };
  return (
    author !== {} && (
      <React.Fragment>
        <p className=" text-muted">
          {nameDisplay}
          <span
            className=""
            style={{ cursor: "pointer" }}
            onClick={handleUserLink}
          >
            @{author.username}
          </span>
        </p>
      </React.Fragment>
    )
  );
}

export function UserPicture(props) {
  let { author } = props;
  author = author ? author : {};
  return (
    <span className="mx-1 px-3 py-2 rounded-circle bg-dark text-white">
      {author[0]}
    </span>
  );
}
