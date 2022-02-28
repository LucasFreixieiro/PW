export const initialState = {
  user: null || JSON.parse(localStorage.getItem("user_info")),
};

const reducer = (state, action) => {
  switch (action.type) {
    case "login": {
      localStorage.setItem("user_info", JSON.stringify(action.user));
      return { user: action.user };
    }
    case "logout": {
      localStorage.setItem("user_info", null);
      fetch("http://localhost:5000/user/logout");
      return { user: "" };
    }
  }
};

export default reducer;
