import { useEffect, useState } from "react";
import "../../css/Management.css";
import React from "react";

function EditUser({user_id, oldRoleID, close_edit, reload_data}) {
    const [user, setUser] = useState(null);
    const [roles, setRoles] = useState([]);
    const [error, setError] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [reloadAll, setReloadAll] = useState(0);

    const cancel = (e, text) => {
        e.preventDefault();
        e.target.parentNode.firstChild.dataset.flag = "remove";
        e.target.parentNode.firstChild.textContent = text;
        e.target.parentNode.removeChild(e.target.parentNode.lastChild);
    };

    const changeRole = (e) => {
        e.preventDefault();
        let roleSelect = document.getElementById("role_select");
        if (
          !roles.some(
            (role) =>
              role.role_id ==
              roleSelect.options[roleSelect.selectedIndex].value
          )
        ) {
          fetch(
            `http://localhost:5000/user/update/role?id=${user_id}&roleID=${
              roleSelect.options[roleSelect.selectedIndex].value
            }`,
            {
              method: "PUT",
              credentials: "include",
            }
          )
            .then(check_error)
            .then((result) => {
                reload_data();
                close_edit();
            })
            .catch((error) => console.log(error));
        }
    };

    function check_error(response) {
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        } else {
          throw Error(response.status);
        }
    }

    useEffect(() => {
        fetch('http://localhost:5000/role/', {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
        })
        .then(check_error)
        .then((result) => {
            setRoles(result);
            setLoaded(true);
        })
        .catch((error) => {
            setError(error);
            setLoaded(true);
        });
    }, [user_id, reloadAll]);

    if (loaded)
        return (
        <form className="management_forms">
            <div className="title_card">Edit user information</div>
            <fieldset className="management_forms_fieldset">
            <legend>User details</legend>
            <label htmlFor="roles">Role</label>
            {roles.length > 0 ? (
                <>
                <select id="role_select" className="_form_input" defaultValue={oldRoleID}>
                    {roles.map((option) => {
                    return (
                        <option value={option.id} key={"option-" + option.id}>
                        {option.description}
                        </option>
                    );
                    })}
                </select>
                <button
                    className="add_btn"
                    onClick={(e) => {
                    changeRole(e);
                    }}
                >
                    Save change
                </button>
                </>
            ) : (
                <>Fetching roles</>
            )}
            </fieldset>
        </form>
        );
    else return <div>Fetching details</div>;
}

export default EditUser;