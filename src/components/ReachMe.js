import React from "react";
import { connect } from "react-redux";

import "./ReachMe.scss";

const mapStateToProps = state => {
  const { user, login } = state;
  return {
    user, login
  };
};

const ReachMe = ({
  user: { email, hireable, login }
}) => {

  const mailToAddress = `mailto:${email}?subject=I checked your portfolio and...`;
  const profile = `https://github.com/${login}/`;

  return (
    <div className="ReachMe">
      <a href={email ? mailToAddress : profile}>
        <button>
          Why not getting in touch?
        </button>
      </a>

      {email ? (
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
