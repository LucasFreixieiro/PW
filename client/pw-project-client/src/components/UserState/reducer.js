export const initialState = {
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "login": {
      return { user: action.user };
    }
  }
};

export default reducer;
