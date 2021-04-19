import React, { memo } from "react";
import PropTypes from "prop-types";

function Error(props) {
  return <div className="alert alert-danger">{props.message}</div>;
}

Error.propTypes = {
  message: PropTypes.string.isRequired,
};

export default memo(Error);
