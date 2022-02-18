import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserValue } from "../UserState/UserProvider";
import "./css/Profile.css";
import ProfileGameList from "./ProfileGameList";
import ProfilePostList from "./ProfilePostList";
import ProfileSummary from "./ProfileSummary";



function Profile() {

  const [user, setUser] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const user_id = useParams().id;

  useEffect(()=>{
      fetch(`http://localhost:5000/profile/${user_id}`, {method: 'GET', mode: 'cors', credentials: 'include'})
      .then(res => res.json())
      .then(
        (result) => {
        setUser(result)
        setIsLoaded(true)
      },
      (error) => {
        setError(error)
        setIsLoaded(true)
      })
  }, [])
  
  // function get_user_info(user) {
  //   if (user) {
  //     let xhr = new XMLHttpRequest();
  //     xhr.withCredentials = true;
  //     xhr.open("GET", `http://localhost:5000/profile/${user}`, true);
  //     xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  //     xhr.onload = function (e) {
  //       if (xhr.status === 200) {
  //         let data = JSON.parse(xhr.responseText);
  //         setUser(data)
  //       }
  //     };
  //     xhr.send();
  //   }
  //   return null;
  // }

  if(error){
    return <div>Error fetching profile: {error.message}</div>
  }
  else if(!isLoaded){
    return <div>Loading profile info..</div>
  }
  else{
    return (
      
      <div className="profile_page">
         {user ? (
           
          <div>
            <ProfileSummary user={user} />
            <ProfileGameList games={user.games} />
            <ProfilePostList posts={user.posts} />
          </div>
        ) : (
          "Failed to get user info"
        )} 
      </div>
    );
  }

  
}
export default Profile;
