import * as React from 'react';
import { connect } from 'react-redux';

import { SingletonRouter, withRouter } from 'next/router';

import * as UserActions from '@actions/UserActions';
import Error from '@components/Error';
import { IStore, IUserState } from '@reducers';

import { FeathersError } from '@feathersjs/errors';
import { AxiosError } from 'axios';
import Loading from '../Loading';
import Unauthorized from './Unauthorized';

const mapDispatchToProps = {
  authenticateUser: UserActions.authenticateUser.request,
  createUser: UserActions.createUser.request,
  logOutUser: UserActions.logOutUser.request,
  toggleAuthModal: UserActions.toggleAuthModal
};

type IProps = IUserState &
  typeof mapDispatchToProps & { router: SingletonRouter };

const disallowedPaths = ['/profile'];

const Authorization: React.FC<IProps> = ({
  user,
  error,
  isFetching,
  router: { pathname },
  children
}) => {
  const success = <>{children}</>;

  if (user || !disallowedPaths.includes(pathname)) {
    return success;
  }

  if (isFetching) {
    return (
      <>
        <Loading />
      </>
    );
  }

  if (error && (error as FeathersError).code && (error as AxiosError).code) {
    return <Unauthorized />;
  }

  console.error(error);

  return <Error />;
};

export default withRouter(
  connect(
    (state: IStore): IUserState => state.user,
    mapDispatchToProps
  )(Authorization)
);
