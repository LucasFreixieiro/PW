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
      
      
      fetch("http://localhost:5000/user/logout", {
        method: "get",
        mode: "cors",
        credentials: "include",
      }).then((result) => {
        document.cookie.split(";").forEach((c) => {
          document.cookie = c
            .replace(/^ +/, "")
            .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
        localStorage.setItem("AOT2022!", null);
      });
      return { user: "" };
    }
  }
};

export default reducer;
