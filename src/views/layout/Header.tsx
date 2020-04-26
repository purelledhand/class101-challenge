import React from 'react';
import Path from 'routes/Path';
import { NavLink } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { useMst } from 'models/Root';
import { useIntl } from 'react-intl';

const Header: React.FC = observer(() => {
  const { cart } = useMst();
  const intl = useIntl();

  return (
    <Wrapper>
      <Container>
        <NavLink to={Path.Home}>
          <img src='https://class101.net/images/class101-main-logo.svg' alt='class101 main logo' />
        </NavLink>
        <Navigator>
          <NavLink to={Path.Products}>
            {intl.formatMessage({ id: 'NAVIGATOR_TO_PRODUCTS' })}
          </NavLink>
          <Badge badgeContent={cart.countItems} color="secondary">
            <NavLink to={Path.Cart}>
              {intl.formatMessage({ id: 'NAVIGATOR_TO_CART' })}
            </NavLink>
          </Badge>
        </Navigator>
      </Container>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  box-shadow: rgb(238, 238, 239) 0px -1px 0px inset;
  padding: 0;
  margin: 0;
`;

const Container = styled.div`
  width: 1170px;
  max-width: 1170px;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
`;

const Navigator = styled.div`
  & a {
    margin-right: 12px;
  }

  & .MuiBadge-root>a {
    margin-right: 4px;
  }
`;

export default Header;
