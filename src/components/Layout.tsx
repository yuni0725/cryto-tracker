import styled from "styled-components";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

function Layout() {
  return (
    <Wrapper>
      <Header></Header>
      <Outlet></Outlet>
    </Wrapper>
  );
}

export default Layout;
