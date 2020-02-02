import { IToDo, IToDoAction } from "./interfaces";
import { ADD_TODO, DECR_ONE, INCR_ONE, REM_TODO } from "./actionTypes";
export const taskReducer = (state: IToDo[], action: IToDoAction) => {
  const add_or_rem = (id: string, factor: number) =>
    state.map((item: IToDo) => {
      if (item.id === id) {
        return {
          ...item,
          remaining: item.remaining + factor > 1 ? item.remaining + factor : 1
        };
      }
      return item;
    });

  switch (action.type) {
    case ADD_TODO:
      return [action.payload, ...state];
    case REM_TODO:
      return state.filter((item: IToDo) => item.id !== action.payload.id);
    case INCR_ONE:
      return add_or_rem(action.payload.id, 1);
    case DECR_ONE:
      return add_or_rem(action.payload.id, -1);
    default:
      throw new Error();
  }
};
