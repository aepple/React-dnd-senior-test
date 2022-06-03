import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import Tables from "../Tables";
import { StateProvider } from "../state";

import "./styles.css";

export default function App() {
  return (
    <StateProvider>
      <DndProvider backend={HTML5Backend}>
        <Tables />
      </DndProvider>
    </StateProvider>
  );
}
