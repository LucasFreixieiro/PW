export const initialState = {
  user: null || JSON.parse(localStorage.getItem("user_info")),
};

const reducer = (state, action) => {
  switch (action.type) {
    case "login": {
      localStorage.setItem("user_info", JSON.stringify(action.user));
      return { user: action.user };
    }
  }
};

export default reducer;
