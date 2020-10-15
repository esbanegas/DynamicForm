import { red } from "@material-ui/core/colors";
import React, { useState } from "react";
import styled from "styled-components";

import { ManageQuestionsAnswers } from "./ManageQuestionsAnswers";
import { Polls } from "./Polls";

const MainStyled = styled.div`
  display: flex;
  flex-direction: row;
  background: #fff;

  .tab {
    display: flex;
    flex-direction: column;

    ._item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 60px;
      cursor: pointer;

      box-sizing: border-box;

      :hover {
        background: rgba(0, 0, 0, 0.2);
      }
    }
  }
`;

export const Main = () => {
  const [selectedItem, setSelectedItem] = useState("manageForms");

  const handleOnClick = (selectedTab) => () => {
    setSelectedItem(selectedTab);
  };

  return (
    <MainStyled>
      <div className="tab">
        <div
          className="_item"
          style={{
            borderRight: selectedItem === "manageForms" && "2px solid red",
          }}
          onClick={handleOnClick("manageForms")}
        >
          <strong>Manage Forms</strong>
        </div>
        <div
          className="_item"
          style={{
            borderRight: selectedItem === "viewAnswers" && "2px solid red",
          }}
          onClick={handleOnClick("viewAnswers")}
        >
          <strong>View Answers</strong>
        </div>
      </div>

      {selectedItem === "manageForms" && <ManageQuestionsAnswers />}
      {selectedItem === "viewAnswers" && <Polls />}
    </MainStyled>
  );
};
