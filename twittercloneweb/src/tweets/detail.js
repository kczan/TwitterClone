import React, { useState } from "react";
import { ActionButton } from "./buttons";
import { UserLink, UserPicture } from "../profiles";

export function ParentTweet(props) {
  const { tweet, retweeter } = props;
  return tweet.og_tweet ? (
    <div className="row">
      <div className="col-11 mx-2 p-3 border rounded">
        <Tweet hideActions className={"mx-1"} tweet={tweet.og_tweet} />
        <span className="mb-0 small text-muted">
          Retweeted via <UserLink author={retweeter} includeFullName={false} />
        </span>
      </div>
    </div>
  ) : null;
}

export function Tweet(props) {
  const className = props.className
    ? props.className
    : "col-10 mx-auto col-md-6 bg-light";
  const { tweet, didRetweet, hideActions } = props;
  const [actionTweet, setActionTweet] = useState(
    props.tweet ? props.tweet : null
  );
  const path = window.location.pathname;
  const match = path.match(/(?<tweetid>\d+)/);
  const urlTweetId = match ? match.groups.tweetid : -1;

  const isDetail = `${tweet.id}` === `${urlTweetId}`;

  const handleLink = (event) => {
    event.preventDefault();
    window.location.href = `/${tweet.id}`;
  };

  const handlePerformAction = (newActionTweet, status) => {
    if (status === 200) {
      setActionTweet(newActionTweet);
    } else if (status === 201) {
      if (didRetweet) {
        didRetweet(newActionTweet);
      }
    }
  };
  return (
    <div className={className}>
      <div className="d-flex">
        <div className="">
          <UserPicture author={tweet.author} />
        </div>
        <div className="col-13">
          <div className="ml-2">
            {tweet.author ? (
              <UserLink author={tweet.author} includeFullName={true} />
            ) : (
              <span className="col-1 mb-6"></span>
            )}
            <p className="overflow-auto">{tweet.content}</p>
            <ParentTweet retweeter={tweet.author} tweet={tweet} />
          </div>

          <div className="btn btn-group px-0 button-container">
            <span className="bg-light p-2 border rounded ">
              {actionTweet && hideActions !== true && (
                <React.Fragment>
                  <ActionButton
                    tweet={actionTweet}
                    didPerformAction={handlePerformAction}
                    action={{
                      type: "like",
                      btnClass: "btn btn-primary btn-sm ml-1 single-action-btn",
                    }}
                  />
                  <ActionButton
                    tweet={actionTweet}
                    didPerformAction={handlePerformAction}
                    action={{
                      type: "unlike",
                      btnClass: "btn btn-primary btn-sm ml-1 single-action-btn",
                    }}
                  />
                  <ActionButton
                    tweet={actionTweet}
                    didPerformAction={handlePerformAction}
                    action={{
                      type: "retweet",
                      btnClass:
                        "btn btn-outline-success btn-sm ml-1 single-action-btn",
                    }}
                  />
                </React.Fragment>
              )}

              {isDetail === true ? null : (
                <button
                  className="btn btn-outline-primary btn-sm ml-1"
                  onClick={handleLink}
                >
                  View
                </button>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
