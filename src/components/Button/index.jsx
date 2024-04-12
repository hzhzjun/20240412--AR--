/**
 * index.jsx
 * Created by 还有醋v on 2022/10/10 下午3:03.
 * Copyright © 2022 haiyoucuv. All rights reserved.
 */

import React, { useState } from "react";

/**
 * @param children
 * @param className
 * @param onClick
 * @param style
 * @return {React.DetailedReactHTMLElement<{onTouchStart: onTouchStart, onClick: (function(): any), onTouchCancel: onTouchEnd, className, style: {transform: string, transitionDuration: number}, onTouchEnd: onTouchEnd}, HTMLElement>}
 * @constructor
 */
export const Button = ({ children, className, onClick = () => void 0, style = {} }) => {
  const [scale, setScale] = useState("unset");

  const onTouchStart = () => {
    setScale("scale(0.9,0.9)");
  };

  const onTouchEnd = () => {
    setScale("unset");
  };

  const onTouchCancel = onTouchEnd;

  return React.createElement("div", {
    className, onTouchStart, onTouchEnd, onTouchCancel, onClick, style: {
      transitionDuration: 0.5, transform: scale, ...style
    }
  }, children);
};
