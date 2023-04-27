import React from "react";
import PropTypes from "prop-types";

function Cards({ dataTabUsers }) {
  return (
    dataTabUsers && (



      <div >
       
      <div className="tabcontainer">
        
        {dataTabUsers.map((el) => (
          <ul className="tabuser"key={el.id}>
             <div className="tabheader"></div>
             <div className="tabuseravatar">
            <li > <img  src={el.avatar_url} /> </li>
            <li className="tabuserlogin">{el.login}</li>
            <li className="tabuserid">ID #{el.id}</li>
            </div>
            {/* <li>Name: {el.name}</li>
            
            <li>Repo: {el.html_url}</li>
            <li>Followers: {el.followers}</li>
            <li>Repos total: {el.public_repos}</li>
            <li>localisation : {el.location || "non renseigné"}</li>
          <li>Dernière activité : {el.updated_at}</li> */}
          <div className="tabfooter"></div>
          </ul>
        ))}
      </div>
      
      </div>
    )
  );
}

Cards.propTypes = {
  dataTabUsers: PropTypes.shape({
    avatar_url: "",
    login: "",
    name: "",
    id: "",
    html_url: "",
    followers: "",
    public_repos: "",
    location: "",
    updated_at: "",
  }).isRequired,
};

export default Cards;
