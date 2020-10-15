import React from 'react';
import styled from 'styled-components';

import { Icon } from '@material-ui/core';

const AlertStyled = styled.div`
  display: flex;
  align-items: center;
  width: 300px;
  height: 80px;
  padding: 5px;
  border-radius: 6px;
  margin: 5px;
  background-color: ${props => props.backgoundColor};

  -webkit-box-shadow: 2px -1px 5px -1px rgba(0,0,0,0.63);
  -moz-box-shadow: 2px -1px 5px -1px rgba(0,0,0,0.63);
  box-shadow: 2px -1px 5px -1px rgba(0,0,0,0.63);

  i {
    font-size: 30px;
    color: #ffffff;
  }

  span {
    color: #ffffff;
    margin-left: 10px;
  }
`;

const getBackgroundColorAlert = type => {
    switch (type) {
        case 'success':
            return '#3f8159';
        case 'info':
            return '#ffc83d';
        case 'error':
            return '#d83b01';

        default:
            return 'yellow';
    }
}

export const AlertTemplateNotification = ({ style, options, message, close }) => (
    <AlertStyled backgoundColor={getBackgroundColorAlert(options.type)}>
        {options.type === 'info' && <Icon iconName="Info" />}
        {options.type === 'success' && <Icon iconName="CheckMark" />}
        {options.type === 'error' && <Icon iconName="Error" />}
        <span>{message}</span>
        {/* <button onClick={close}>X</button> */}
    </AlertStyled>
)
