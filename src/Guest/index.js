import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import classNames from "classnames";

import { useStateContext } from "../state";

import styles from './styles.module.css';

/**
 * Guest is a simple React component which has an implementation of
 * react-dnd to enable both dragging and dropping. The useDrag hook
 * allows the element to be dragged, and the useDrop hook is used to
 * listen to dragged elements hovering over it.
 */
const Guest = ({ name, id }) => {
  const [, { moveGuest, dragEnd }] = useStateContext();
  const ref = useRef();

  const [collected, drag] = useDrag(() => ({
    type: "guest",
    item: { id },
    isDragging: (monitor) => monitor.getItem().id === id,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
    end: dragEnd
  }));

  const [, drop] = useDrop(() => ({
    accept: "guest",
    hover: (item, monitor) => {
      /**
       * The hovering event in JavaScript bubbles up the DOM tree, this can
       * lead to weird bugs when dragging and dropping. To mitigate this the
       * react-dnd library allows checking if it's a "shallow" hover using
       * the monitor.isOver method.
       */
      if (!monitor.isOver({ shallow: true })) return;
      /**
        * The Guest component is used for every guest in the list, so although
        * it listens for both dragging and dropping events, it isn't allowed
        * to perform both actions at the same time. This is why we prevent the
        * moveGuest action from being called if react-dnd is triggering a hover
        * on itself.
       */
      if (item.id === id) return;
      /**
       * If the conditions above did not cancel the hover event, this is a valid
       * hover, and we trigger the moveGuest action which ultimately ends up at
       * the MOVE_GUEST reducer in the state.
       */
      moveGuest({
        draggedId: item.id,
        hoveredId: id
      });
    }
  }));

  return (
    <div
      className={classNames(styles.guest, { [styles.outlined]: collected.isDragging })}
      ref={drag(drop(ref))}
    >
      <span style={{ visibility: collected.isDragging ? "hidden" : "visible" }}>
        {name}
      </span>
    </div>
  );
};

export default Guest;
