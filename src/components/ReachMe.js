import React from "react";
import { connect } from "react-redux";

import "./ReachMe.scss";

const mapStateToProps = state => {
  return {
    user: state.user,
    login: state.login
  };
};

const ReachMe = ({ user }) => {
  const { email, hireable, login } = user;

  const mailtoAddress = `mailto:${email}?subject=I checked your portfolio and...`;
  const profile = `https://github.com/${login}/`;

  return (
    <div className="ReachMe">
      {email == null ? (
        <a href={profile}>
          <button>why not getting in touch?</button>
        </a>
      ) : (
        <a href={mailtoAddress}>
          <button>why not getting in touch?</button>
        </a>
      )}

      {email !== null ? (
        <span>
          {hireable ? (
            <span>
              plus, I'm now <a href={mailtoAddress}>hireable</a>
            </span>
          ) : (
            <span>
              I could soon be <a href={mailtoAddress}>hireable</a>
            </span>
          )}
        </span>
      ) : (
        <span>
          Reach me at my Github profile <a href={profile}>here</a>
        </span>
      )}
    </div>
  );
};

export default connect(mapStateToProps)(ReachMe);
