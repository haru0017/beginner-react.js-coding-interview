import "./styles.css";
import axios from "axios";
import { useEffect, useState, useRef } from "react";

interface UserName {
  first: string;
  last: string;
  title: string;
}

interface UserPicture {
  thumbnail: string;
}

interface Userinfo {
  name: UserName;
  picture: UserPicture;
}

const FetchRandomData = (pageNmber: number) => {
  return axios
    .get(`https://randomuser.me/api?page=${pageNmber}`)
    .then(({ data }) => {
      console.log(data);
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const getFullUserName = (userinfo: Userinfo) => {
  const {
    name: { first, last }
  } = userinfo;
  return `${first} ${last}`;
};

export default function App() {
  const [counter, setCounter] = useState(0);
  const [userInfos, setUserinfos] = useState<any>([]);
  const [nextPageNumber, setNextPageNumber] = useState(1);
  const [randomUserDataJson, setRandomUserDataJson] = useState("");

  const fetchNextUser = useRef(() => {});

  fetchNextUser.current = () => {
    FetchRandomData(nextPageNumber).then((randomData) => {
      setRandomUserDataJson(
        JSON.stringify(randomData, null, 2) || "No user data found."
      );
      if (randomData === undefined) return;
      const newUserInfos = [...userInfos, ...randomData.results];
      setUserinfos(newUserInfos);
      setNextPageNumber(randomData.info.page + 1);
    });
  };

  useEffect(() => {
    fetchNextUser.current();
  }, []);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <p>{counter}</p>
      <button onClick={() => setCounter(counter + 1)}>Increase counter</button>
      <button onClick={() => fetchNextUser.current()}>Fetch Next User</button>
      {userInfos.map((userinfo: Userinfo, idx: number) => (
        <div key={idx}>
          <p>{getFullUserName(userinfo)}</p>
          <img src={userinfo.picture.thumbnail} alt="" />
        </div>
      ))}
      <pre>{randomUserDataJson}</pre>
    </div>
  );
}
