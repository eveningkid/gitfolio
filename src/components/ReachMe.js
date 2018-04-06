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

  const mailToAddress = `mailto:${email}?subject=I checked your portfolio and...`;
  const profile = `https://github.com/${login}/`;

  return (
    <div className="ReachMe">
      <a href={email === null ? profile : mailToAddress}>
        Why not getting in touch?
      </a>

      {email !== null ? (
        <span>
          {hireable ? "plus I'm now" : "I could soon be"}{" "}
          <a href={mailToAddress}>hireable</a>
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
