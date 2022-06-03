import { useDrop } from "react-dnd";

import Guest from "../Guest";
import { useStateContext } from "../state";

import styles from './styles.module.css';

/**
 * Guest is a simple React component which has an implementation of
 * react-dnd to only enable dropping. The useDrop hook allows the
 * element to be respond to Guest components hovering over it. 
 */
const Table = ({ name, id, size, guests }) => {
  const [{ error }, { moveGuest }] = useStateContext();

  const [, drop] = useDrop(() => ({
    accept: "guest",
    hover: (item, monitor) => {
      /** 
        * The Guest component will only trigger this event if
        * it's hovering directly over the Table and not on one
        * of the other Guest components inside of it thanks to
        * the use of monitor.isOver.
       */
      if (!monitor.isOver({ shallow: true })) return;
      moveGuest({
        draggedId: item.id,
        hoveredId: id
      });
    }
  }));

  return (
    <div ref={drop} className={styles.table}>
      {error?.id === id && <div className={styles.error}>{error.message}</div>}
      <h1>{name}</h1>
      <p>
        Seats: {guests.length}/{size}
      </p>
      {guests.map((guest) => (
        <Guest key={guest.id} name={guest.name} id={guest.id} />
      ))}
    </div>
  );
};

export default Table;
