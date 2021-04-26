import {
  TODO_ONCHANGE,
  TODO_ADD,
  TODO_DELETE,
} from '../constants/actionTypes';

export const initialState = {
  item: "",
  data: [],
};

const todo = (state = initialState, action) => {
  const { type, item, } = action;

  switch (type) {
    case TODO_ONCHANGE: {
      return {...state, item};
    }

    case TODO_ADD: {
      if (item === '') { return state; }
      return {...state, data:[...(state.data), item]};
    }

    case TODO_DELETE: {
      const { data, ...restState } = state;
      const updated = [...data].filter(_item => _item !== item);
      return {...state, data: updated};
    }

    default: {
      return state;
    }
  }
};

export default todo;