import { reducerTypes } from '.';
import data from '../data.json';

const getGuest = (state, tableIndex, guestIndex) => {
  return state.data[tableIndex].guests[guestIndex];
}

describe('MOVE_GUEST reducer', () => {
  const initialState = { data, error: null };

  test('moves guest within table', () => {
    const initialSecondGuest = getGuest(initialState, 0, 1);
    const initialThirdGuest = getGuest(initialState, 0, 2);
    const initialFourthGuest = getGuest(initialState, 0, 3);
    const newState = reducerTypes.MOVE_GUEST({ data }, {
      draggedId: initialFourthGuest.id,
      hoveredId: initialSecondGuest.id,
    });
    expect(getGuest(newState, 0, 1).id).toEqual(initialFourthGuest.id);
    expect(getGuest(newState, 0, 2).id).toEqual(initialSecondGuest.id);
    expect(getGuest(newState, 0, 3).id).toEqual(initialThirdGuest.id);
  });

  test('moves guest between tables', () => {
    const initialFirstTableSecondGuest = getGuest(initialState, 0, 1);
    const initialFirstTableThirdGuest = getGuest(initialState, 0, 2);
    const initialThirdTableThirdGuest = getGuest(initialState, 2, 2);
    const initialThirdTableFourthGuest = getGuest(initialState, 2, 3);

    const newState = reducerTypes.MOVE_GUEST({ data }, {
      draggedId: initialThirdTableThirdGuest.id,
      hoveredId: initialFirstTableSecondGuest.id,
    });

    expect(getGuest(newState, 0, 1).id).toEqual(initialThirdTableThirdGuest.id);
    expect(getGuest(newState, 0, 2).id).toEqual(initialFirstTableSecondGuest.id);
    expect(getGuest(newState, 0, 3).id).toEqual(initialFirstTableThirdGuest.id);
    expect(getGuest(newState, 2, 2).id).toEqual(initialThirdTableFourthGuest.id);
  });
});