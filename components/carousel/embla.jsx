// we can create our own custom components
import React, { forwardRef } from "react";

const Embla = forwardRef(function embla({ className, children }, ref) {
  return (
    <div ref={ref} className={`${className} overflow-hidden`}>
      {children}
    </div>
  );
});

function EmblaContainer(props) {
  const { className, children } = props;

  return <div className={`${className} flex`}>{children}</div>;
}

// FIXME: here lol
// if you want to see n slides at once youll need to modify this function
function EmblaSlide(props) {
  const { className, children } = props;

  return (
    <div className={`${className} row-0 shrink-0 min-w-0`}>{children}</div>
  );
}

export { Embla, EmblaContainer, EmblaSlide };
