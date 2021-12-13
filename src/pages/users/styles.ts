import styled from 'styled-components';
import { Table } from 'antd';
import {
  colorPrimaryText,
  gap,
  buttonBorder,
  tableBorders,
} from 'utils/css-constants';
import ActionButton from 'components/ActionButton';

export const StyledMain = styled.main`
 
  margin: 0 auto;
  height: 100vh;

  ${gap};
`;
export const StyleDiv = styled.div`
  width: clamp(320px, 100%, 1440px);
  margin: 0 auto;
  height: 100vh;
  display: flex;
  padding: 20px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  ${gap};
`;
export const ButtonWrap = styled.div`
  width: clamp(160px, 50%, 320px);
  flex-basis: 40px;
  align-self: flex-end;
  ${colorPrimaryText}
  & button {
    ${buttonBorder}
  }
`;
export const FlexContainer = styled.div`
  width: 100%;
  display: flex; 
`;
export const ContentWrap = styled.div`
  width: 100%;
  flex-basis: calc(100% - 40px);
`;

export const StyledTable = styled(Table)`
  ${tableBorders}
`;
export const StyledName = styled.p`
 display: inline-block;
 margin-right: 5px;
 color: ${(props): any => props.color && 'grey'};
`;

export const StyledActionButton = styled(ActionButton)`
 color: ${(props): any => props.color && 'grey'};
`;
