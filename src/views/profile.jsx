import React from "react";
import Header from "../components/header.jsx";
import '../assets/styles/profile.css';
import UserVector from '../assets/user-vector.jpeg';
import EditIcon from '@mui/icons-material/Edit';

function Profile() {
    return (
        <div>
            <Header/>
            <section>
              {/*---- head ----  */}
              <section className={'profile-head'}>

                  <div
                      style={{background: `url(${UserVector})`, backgroundPosition: 'center', backgroundSize: 'cover'}}
                      className={'profile-head-img'}>
                  </div>

                  <div className={'profile-head-title mukta-bold'}>
                      Siril Aiya <span className={'profile-head-edit'}><EditIcon style={{fontSize: '13px'}}/>Edit</span>
                  </div>

                  <div className={'profile-head-data'}>

                      <div><span>Gender</span>Male</div>
                      <div><span>Age</span>28</div>
                      <div><span>Followers</span>200</div>
                      <div><span>Following</span>201</div>

                  </div>

              </section>
            </section>
        </div>
    )
}

export default Profile;