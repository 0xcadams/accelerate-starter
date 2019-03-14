import * as React from 'react';
import { default as Link } from 'next/link';
import { withRouter } from 'next/router';
import {
  Button,
  Container,
  Icon,
  Image,
  Menu,
  Responsive,
  Segment,
  Sidebar
} from 'semantic-ui-react';

const Avatar = () => (
  <Image
    src="https://react.semantic-ui.com/images/wireframe/square-image.png"
    avatar
  />
);

interface IMobileHeaderState {
  sidebarOpened: boolean;
}

class MobileHeader extends React.Component<any, IMobileHeaderState> {
  // TODO fix these types
  public state = {
    sidebarOpened: false
  };

  private _handleSidebarHide = () => this.setState({ sidebarOpened: false });

  private _handleToggle = () => this.setState({ sidebarOpened: true });

  public render() {
    const {
      getWidth,
      children,
      user,
      isFetchingAuth,
      logOutUser,
      toggleAuthModal,
      router: { pathname }
    } = this.props;

    const { sidebarOpened } = this.state;

    return (
      <Responsive
        fireOnMount
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation="push"
          inverted
          onHide={this._handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
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
          <Menu.Item disabled={isFetchingAuth} as="a">
            Log in
          </Menu.Item>
          <Menu.Item disabled={isFetchingAuth} as="a">
            Sign Up
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign="center"
            style={{ padding: '1em 0em' }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item onClick={this._handleToggle}>
                  <Icon name="sidebar" />
                </Menu.Item>
                <Menu.Item position="right">
                  {!user ? (
                    <React.Fragment>
                      <Button
                        id="login-btn"
                        loading={isFetchingAuth}
                        as="a"
                        inverted
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
                        loading={isFetchingAuth}
                        as="a"
                        inverted
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
                    <Button
                      id="user-avatar-btn"
                      loading={isFetchingAuth}
                      onClick={logOutUser}
                    >
                      <Avatar />
                    </Button>
                  )}
                </Menu.Item>
              </Menu>
            </Container>
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    );
  }
}

export default withRouter(MobileHeader);
