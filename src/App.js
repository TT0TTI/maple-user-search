import React, { useState, useRef } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [crwal, setCrwal] = useState({});
  const nameInput = useRef();
  const [uN, setUN] = useState("");

  const changeUN = (e) => {
    setUN(e.target.value);
  };

  const submitUN = async (e) => {
    if (!uN) {
      e.preventDefault();
      nameInput.current.focus();
    } else {
      e.preventDefault();
      const res = await axios.get(`user?uN=${uN}`);
      console.log(res.status);
      setCrwal(res.data);
      setUN("");
      nameInput.current.focus();
    }
  };

  return (
    <div className="container">
      <form onSubmit={submitUN} className="userForm">
        <input
          type="text"
          className="userInput"
          value={uN}
          onChange={changeUN}
          ref={nameInput}
          placeholder="유저의 닉네임을 입력해주세요."
        />
        <button type="submit" className="sumbitBtn">
          검색
        </button>
      </form>

      <div className="userInfo">
        <div className="wallR"></div>
        <div className="main">
          {Object.keys(crwal).length === 0 ? (
            <>
              <div className="nullCheck">값이 비어있습니다.</div>
            </>
          ) : (
            <>
              <img className="userServer" src={crwal.userServer} />
              <div className="userName">닉네임 : {crwal.userName}</div>
              <div className="userJob">직업 : {crwal.userJob}</div>
              <div className="userAllR">종합랭킹 : {crwal.userAllR}</div>
              <div className="userWorldR">월드랭킹 : {crwal.userWorldR}</div>
              <div className="userJobWR">
                직업랭킹(월드) : {crwal.userJobWR}
              </div>
              <div className="userJobAR">
                직업랭킹(전체) : {crwal.userJobAR}
              </div>
              <div className="userGild">길드 : {crwal.userGild}</div>
              <div className="userLev">Lev : {crwal.userLev}</div>
            </>
          )}
        </div>
        <div className="wallL"></div>
      </div>
    </div>
  );
};
export default App;
