import Table from '../Table';
import { useStateContext } from '../state';
import styles from './styles.module.css';

/**
 * Tables is a simple React component which receives
 * the list of tables from the state context and maps
 * them into the DOM.
 */
export default function Tables() {
  const  [{ data }] = useStateContext();
  return (
    <div className={styles.tables}>
      {data.map((table) => (
        <Table
          key={table.id}
          id={table.id}
          size={table.size}
          name={table.name}
          guests={table.guests}
        />
      ))}
    </div>
  );
}