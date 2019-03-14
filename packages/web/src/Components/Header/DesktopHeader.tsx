import * as React from 'react';
import { default as Link } from 'next/link';
import { withRouter } from 'next/router';
import {
  Button,
  Container,
  Image,
  Menu,
  Responsive,
  Segment,
  Visibility
} from 'semantic-ui-react';

const Avatar: React.FunctionComponent = () => (
  <Image
    src="https://react.semantic-ui.com/images/wireframe/square-image.png"
    avatar
  />
);

interface IDesktopHeaderState {
  fixed: boolean;
}

class DesktopHeader extends React.Component<any, IDesktopHeaderState> {
  // TODO fix these types
  public state = {
    fixed: true
  };

  private _hideFixedMenu = () => this.setState({ fixed: false });

  private _showFixedMenu = () => this.setState({ fixed: true });

  public render(): JSX.Element {
    const {
      getWidth,
      children,
      user,
      isFetchingAuth,
      router: { pathname }
    } = this.props;
    const { fixed } = this.state;

    return (
      <Responsive
        fireOnMount
        getWidth={getWidth}
        minWidth={Responsive.onlyTablet.minWidth}
      >
        <Visibility
          once={false}
          onBottomPassed={this._showFixedMenu}
          onBottomPassedReverse={this._hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            style={{ padding: '1em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : undefined}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container>
                <Link prefetch href="/">
                  <Menu.Item
                    as="a"
                    active={pathname === '/' || pathname === ''}
                  >
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
                        loading={isFetchingAuth}
                        as="a"
                        inverted={!fixed}
                        onClick={() =>
                          this.props.toggleAuthModal({
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
                        inverted={!fixed}
                        primary={fixed}
                        style={{ marginLeft: '0.5em' }}
                        onClick={() =>
                          this.props.toggleAuthModal({
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
                      onClick={this.props.logOutUser}
                    >
                      <Avatar />
                    </Button>
                  )}
                </Menu.Item>
              </Container>
            </Menu>
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    );
  }
}

export default withRouter(DesktopHeader);
