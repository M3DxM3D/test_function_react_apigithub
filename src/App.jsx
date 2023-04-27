import React from "react";
import { useState, useEffect } from "react";
import "./Modal_Profile.css";
import "./Cards.css";
import Cards from "./assets/components/Cards";
import Modal_Profile from "./assets/components/Modal_Profile";
import axios from "axios";
import loadingImg from "./loadingImg.gif"



function App() {
  const [dataUsers, setDataUsers] = useState([]);
  const [dataTab, setDataTab] = useState();
  const [dataRepos, setDataRepos] = useState();
  const [dataInfosRepos, setDataInfosRepos] = useState([]);
  const [Lang, setLang] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dataGiters, setDataGiters] = useState([]);

  const getUser = () => {
    axios
      .get(`https://api.github.com/users?per_page=10`)
      .then((response) => {
        console.log(response);
        setDataUsers(response.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  useEffect(() => {
    if (dataUsers.length > 0) {
      setLoading(true);
      axios
        .get(`https://api.github.com/users/${dataUsers[count].login}/repos`)
        .then((response) => {
          console.log(response);
          setDataRepos(response.data[0]);
          setDataInfosRepos(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error.message);
          setLoading(false);
        });
    }
  }, [dataUsers, count, setLoading]);

  useEffect(() => {
    const langSet = new Set();
    for (const repo of dataInfosRepos) {
      if (repo.language) {
        langSet.add(repo.language);
      }
    }
    setLang(Array.from(langSet));
  }, [dataInfosRepos]);

  const getUserTab = () => {
    axios
      .get(`https://api.github.com/users`)
      .then((response) => {
        console.log(response);
        setDataTab(response.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  useEffect(() => {
    if (dataUsers.length > 0) {
      setLoading(true);
      axios
        .get(`https://api.github.com/users/${dataUsers[count].login}`)
        .then((response) => {
          console.log(response);
          setDataGiters(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error.message);
          setLoading(false);
        });
    }
  }, [dataUsers, count, setLoading]);


  let tabRepos = dataInfosRepos.slice();
  let stars = 0;
  for (let i = 0; i < tabRepos.length; i++) {
    stars += tabRepos[i].stargazers_count;
      }

//boutons de selections (précédent , profil aléatoire, suivant)

  const handleClickPrec = () => {
    setCount(count - 1);
  };
  const handleClickSuiv = () => {
    setCount(count + 1);
  };
  const getRandomUser = () => {
    const randomIndex = Math.floor(Math.random() * dataUsers.length);
    setCount(randomIndex);
  };

  return (

    // on fait un petit chargement si la page est longue, sinon on fait apparaitre les éléments du profil

    <div>
      {loading ? ( <img src={loadingImg} alt="Loading..."  /> 
      ) : (
        // on retourne le composant giters ( le modal d'un utilisateur) et tabusers (l'ensemble des cartes)
        <div>
          <Modal_Profile  dataRepos={dataRepos}  dataInfosRepos={dataInfosRepos}  dataUsers={dataUsers}  Lang={Lang}  count={count}  setCount={setCount}  dataGiters={dataGiters} />
          <Cards dataTabUsers={dataTab} /> 

            <div>
            <button type="button" onClick={getUser}>
              Get user
            </button>
            <button type="button" onClick={getUserTab}>
              Get Tab_users
            </button>

          </div>

          <div className="buttons">
              <button className="precedent" onClick={count > 0 ? handleClickPrec : null}> prev </button>
             <button type="button" onClick={getRandomUser}> ? </button>
              <button className="next" onClick={count < dataUsers.length - 1 ? handleClickSuiv : null}>  Next</button>
        </div>

        </div>
      )}
    </div>
  );
}

export default App;
