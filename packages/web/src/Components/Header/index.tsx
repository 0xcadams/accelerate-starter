import * as React from 'react';
import { connect } from 'react-redux';

import * as AuthActions from '@Actions/AuthActions';
import { default as AuthModal } from '@Components/AuthModal';
import { IAuthModalState, IStore } from '@Reducers';

import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';

interface IHeaderProps {
  getWidth(): number;
}

type IProps = IAuthModalState &
  typeof AuthActions.authenticateUser.request &
  typeof AuthActions.createUser.request &
  IHeaderProps &
  any; // TODO fix these types

class Header extends React.Component<IProps, {}> {
  public render(): JSX.Element {
    const {
      getWidth,
      children,
      toggleAuthModal,
      createUser,
      authenticateUser,
      logOutUser,
      isFetching,
      user
    } = this.props;

    return (
      <React.Fragment>
        <AuthModal />
        <MobileHeader
          getWidth={getWidth}
          isFetchingAuth={isFetching}
          user={user}
          createUser={createUser}
          authenticateUser={authenticateUser}
          logOutUser={logOutUser}
          toggleAuthModal={toggleAuthModal}
        >
          {children}
        </MobileHeader>
        <DesktopHeader
          getWidth={getWidth}
          isFetchingAuth={isFetching}
          user={user}
          createUser={createUser}
          authenticateUser={authenticateUser}
          logOutUser={logOutUser}
          toggleAuthModal={toggleAuthModal}
        >
          {children}
        </DesktopHeader>
      </React.Fragment>
    );
  }
}

export default connect(
  (state: IStore): IAuthModalState => state.auth,
  {
    authenticateUser: AuthActions.authenticateUser.request,
    createUser: AuthActions.createUser.request,
    logOutUser: AuthActions.logOutUser.request,
    toggleAuthModal: AuthActions.toggleAuthModal
  }
)(Header);
