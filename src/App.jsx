import React, { useCallback, useState } from "react";

/**
 * @see https://github.com/nerdyman/react-compare-slider
 */

import {
  ReactCompareSlider,
  ReactCompareSliderImage
} from "react-compare-slider";

/** Keep a value within a range of 0-100. */
const toRange = (value) => Math.min(Math.max(value, 0), 100);

export const App = ({ style, ...props }) => {
  const [position, setPosition] = useState(25);
  const [hasFocus, setHasFocus] = useState(false);

  /** Change slider position on keyboard events. */
  const handleKeyDown = (ev) => {
    if (ev.key === "ArrowRight") {
      setPosition((prev) => toRange(prev + 5));
    } else if (ev.key === "ArrowLeft") {
      setPosition((prev) => toRange(prev - 5));
    }
  };

  /** Toggle the focus message. */
  const handleFocus = () => setHasFocus((prev) => !prev);

  /** Focus the target on click. */
  const handleClick = (ev) => {
    ev.persist();
    ev.target.focus();
  };

  /**
   * Keep our position and the position of the slider from mouse events in sync.
   */
  const handlePositionChange = useCallback(
    (nextPosition) => {
      if (position !== nextPosition) setPosition(nextPosition);
    },
    [position]
  );

  return (
    <>
      <ReactCompareSlider
        {...props}
        tabindex={0}
        onClick={handleClick}
        onFocusCapture={handleFocus}
        onBlurCapture={handleFocus}
        position={position}
        onKeyDown={handleKeyDown}
        itemOne={
          <ReactCompareSliderImage
            src="https://images.unsplash.com/photo-1580458148391-8c4951dc1465?auto=format&fit=crop&w=1500&q=80"
            style={{ filter: "grayscale(1)" }}
            alt="one"
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src="https://images.unsplash.com/photo-1580458148391-8c4951dc1465?auto=format&fit=crop&w=1500&q=80"
            alt="two"
          />
        }
        onPositionChange={handlePositionChange}
        style={{
          display: "flex",
          width: "100%",
          height: "100vh",
          ...style
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 999,
          fontSize: "1.5rem",
          background: "blue",
          color: "white"
        }}
      >
        Has focus: {hasFocus.toString()}
      </div>
    </>
  );
};
