import { useReducer, createContext, useContext } from "react";

import data from '../data.json';
import {
  move,
  remove,
  insert,
  push,
} from "../lib/utils";

const initialState = { data, error: null };

const checkCompatiblity = (_guests) => {
  const counts = _guests.length
  for (let i = 0; i < counts; i++) {
    const left = _guests[i - 1]
    const right = _guests[i + 1]
    console.log({ left, me: _guests[i], right })
    if (left) {
      if (left.doNotPair && left.doNotPair.some(enemy => enemy === _guests[i].id))
        return _guests[i].name + ' can\'t sit next to: ' + left.name
      if (_guests[i].doNotPair && _guests[i].doNotPair.some(enemy => enemy === left.id))
        return _guests[i].name + ' can\'t sit next to: ' + left.name
    }
    if (right) {
      if (right.doNotPair && right.doNotPair.some(enemy => enemy === _guests[i].id))
        return _guests[i].name + ' can\'t sit next to: ' + right.name
      if (_guests[i].doNotPair && _guests[i].doNotPair.some(enemy => enemy === right.id))
        return _guests[i].name + ' can\'t sit next to: ' + right.name
    }
  }
  return null
}

export const reducerTypes = {
  MOVE_GUEST(state, { draggedId, hoveredId }) {
    // TODO: Implement logic based on the assignment's requirements
    const { data } = state
    const draggedParentIndex = data.findIndex(table => table.guests.some(guest => guest.id === draggedId))
    const draggedIndex = data[draggedParentIndex].guests.findIndex(guest => guest.id === draggedId)
    const hoveredParentIndex = data.findIndex(table => table.guests.some(guest => guest.id === hoveredId) || table.id === hoveredId)
    const hoveredIndex = data[hoveredParentIndex].guests.findIndex(guest => guest.id === hoveredId)
    const temp = [...data]

    if (data[draggedParentIndex].id === data[hoveredParentIndex].id) { // when moving guest in its parent table
      if (hoveredIndex > -1) {
        const newGuests = move([...data[draggedParentIndex].guests], draggedIndex, hoveredIndex)
        const message = checkCompatiblity(newGuests)
        if (message) { // if neighboring parents are not compatible
          return { ...state, error: { message: message, id: data[hoveredParentIndex].id } }
        }

        temp[draggedParentIndex].guests = newGuests
        return { ...state, data: temp }
      } else return state
    }
    else { // when moving to another table

      if (data[hoveredParentIndex].guests.length === data[hoveredParentIndex].size) {
        // when table is full return original state
        return { ...state, error: { message: data[hoveredParentIndex].name + ' is full!', id: data[hoveredParentIndex].id } }
      }
      if (hoveredIndex < 0) {
        // when moving on another table, not over guest
        const newGuests = push(temp[hoveredParentIndex].guests, data[draggedParentIndex].guests[draggedIndex])
        const message = checkCompatiblity(newGuests)
        if (message) // if neighboring parents are not compatible
          return { ...state, error: { message: message, id: data[hoveredParentIndex].id } }

        temp[draggedParentIndex].guests = remove(temp[draggedParentIndex].guests, draggedIndex)
        temp[hoveredParentIndex].guests = newGuests
        return { ...state, data: temp }
      } else {
        // when hover another guest of other table
        const newGuests = insert(temp[hoveredParentIndex].guests, hoveredIndex, data[draggedParentIndex].guests[draggedIndex])
        const message = checkCompatiblity(newGuests)
        if (message) { // if neighboring parents are not compatible
          return { ...state, error: { message: message, id: data[hoveredParentIndex].id } }
        }
        temp[draggedParentIndex].guests = remove(temp[draggedParentIndex].guests, draggedIndex)
        temp[hoveredParentIndex].guests = newGuests
        return { ...state, data: temp }
      }
    }
  },
  DRAG_END(state) {
    return { ...state, error: null };
  }
}

const reducer = (state, action) => reducerTypes[action.type](state, action);

const Context = createContext();

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Context.Provider value={{ state, dispatch }}>
    {children}
  </Context.Provider>
}

export const useStateContext = () => {
  const { state, dispatch } = useContext(Context);
  const moveGuest = (action) => dispatch({ type: 'MOVE_GUEST', ...action });
  const dragEnd = (action) => dispatch({ type: 'DRAG_END', ...action });
  return [state, { moveGuest, dragEnd }];
}
