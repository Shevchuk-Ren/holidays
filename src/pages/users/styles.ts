import styled from 'styled-components';
import { Table, Input, Button } from 'antd';
import {
  colorPrimaryText,
  gap,
  buttonBorder,
  tableBorders,
} from 'utils/css-constants';

export const StyledMain = styled.main`
  width: clamp(320px, 100%, 1440px);
  margin: 0 auto;
  display: flex;
  padding: 20px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  ${gap};
`;
export const WrapperSet = styled.div`

  display: flex;
  width: 100%;
 
`;
export const ButtonWrap = styled.div`
  width: clamp(160px, 50%, 320px);
  width: 30%;
  align-self: flex-end;
  ${colorPrimaryText}
  & button {
    ${buttonBorder}
  }
`;

export const StyledFilter = styled(Input)`
 margin-right: 40px;
 
`;
export const ContentWrap = styled.div`
  width: 100%;
  flex-basis: calc(100% - 40px);
`;

export const StyledTable = styled(Table)`
  ${tableBorders}
`;
export const StyledPage = styled.div`
width:100%;
display:flex;
margin: 0;
`;

export const StyledContent = styled.div`
width:100%;
display: flex;
flex-wrap: wrap;
padding-top: 100px;
`;
export const StyledName = styled.p`
 display: inline-block;
 margin-right: 5px;
 color: ${(props): string | undefined => props.color && 'grey'};
`;

export const StyledActionButton = styled(Button)`
 color: ${(props): string | undefined => props.color && 'grey'};
`;
