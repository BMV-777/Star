import { useState } from "react";
import PropTypes from "prop-types";

import Star from "../Star/Star";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const styleContainer = {
  display: "flex",
};

StarRating.propTypes = {
  maxRating: PropTypes.number,
  size: PropTypes.number,
  color: PropTypes.string,
  messages: PropTypes.array,
  onRatings: PropTypes.func,
  className: PropTypes.string,
  defaultRating: PropTypes.number,
};

export default function StarRating({
  maxRating = 7,
  color = "yellow",
  size = 48,
  messages = [],
  onRatings,
  defaultRating = 0,
  className = "",
}) {
  const [pointer, setPointer] = useState(defaultRating);
  const [tempPointer, setTempPointer] = useState(0);

  function handelPointer(pointer) {
    setPointer(pointer);
    onRatings(pointer);
  }

  const titleStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size / 1.5}px`,
  };

  return (
    <div style={containerStyle} className={className}>
      <div style={styleContainer}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onPointer={() => handelPointer(i + 1)}
            full={tempPointer ? tempPointer >= i + 1 : pointer >= i + 1}
            onHoverIn={() => setTempPointer(i + 1)}
            onHoverOut={() => setTempPointer(0)}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={titleStyle}>
        {messages.length === maxRating
          ? messages[tempPointer ? tempPointer - 1 : pointer - 1]
          : tempPointer || pointer || ""}
      </p>
    </div>
  );
}
