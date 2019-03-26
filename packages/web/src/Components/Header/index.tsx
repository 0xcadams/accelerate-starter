import * as React from 'react';
import { connect } from 'react-redux';

import { default as Link } from 'next/link';
import { SingletonRouter, withRouter } from 'next/router';

import { Button, Container, Dropdown, Menu, Segment } from 'semantic-ui-react';

import * as AuthActions from '@Actions/AuthActions';
import { IAuthModalState, IStore } from '@Reducers';

interface IHeaderProps {
  getWidth(): number;
}

const mapDispatchToProps = {
  authenticateUser: AuthActions.authenticateUser.request,
  createUser: AuthActions.createUser.request,
  logOutUser: AuthActions.logOutUser.request,
  toggleAuthModal: AuthActions.toggleAuthModal
};

type IProps = IAuthModalState &
  typeof mapDispatchToProps &
  IHeaderProps & { router: SingletonRouter };

const Header: React.FC<IProps> = ({
  children,
  user,
  isFetching,
  router: { pathname },
  logOutUser,
  toggleAuthModal
}) => (
  <React.Fragment>
    <Segment
      inverted
      textAlign="center"
      style={{ padding: '1em 0em' }}
      vertical
    >
      <Menu fixed="top" size="large">
        <Container>
          <Link prefetch href="/">
            <Menu.Item as="a" active={pathname === '/' || pathname === ''}>
              Home
            </Menu.Item>
          </Link>
          <Link prefetch href="/about">
            <Menu.Item as="a" active={pathname === '/about'}>
              About
            </Menu.Item>
          </Link>
          <Menu.Item position="right">
            {!user ? (
              <React.Fragment>
                <Button
                  id="login-btn"
                  loading={isFetching}
                  onClick={() =>
                    toggleAuthModal({
                      isSignUp: false,
                      showModal: true
                    })
                  }
                >
                  Log in
                </Button>
                <Button
                  className="signup-btn"
                  loading={isFetching}
                  primary
                  style={{ marginLeft: '0.5em' }}
                  onClick={() =>
                    toggleAuthModal({
                      isSignUp: true,
                      showModal: true
                    })
                  }
                >
                  Sign Up
                </Button>
              </React.Fragment>
            ) : (
              <Dropdown
                id="user-avatar-btn"
                loading={isFetching}
                icon="user"
                pointing="top right"
                button
                direction="left"
                className="icon"
              >
                <Dropdown.Menu>
                  <Dropdown.Header content={user.email} />
                  <Dropdown.Divider />
                  <Dropdown.Item id="account-btn">Account</Dropdown.Item>
                  <Dropdown.Item id="sign-out-btn" onClick={() => logOutUser()}>
                    Sign Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
            <Button
              aria-label="GitHub Link"
              id="github-btn"
              style={{ marginLeft: '0.5em' }}
              icon="github"
              as="a"
              target="_blank"
              rel="noopener"
              href="https://github.com/chase-adams/accelerate-starter"
            />
          </Menu.Item>
        </Container>
      </Menu>
    </Segment>

    {children}
  </React.Fragment>
);

export default withRouter(
  connect(
    (state: IStore): IAuthModalState => state.auth,
    mapDispatchToProps
  )(Header)
);
