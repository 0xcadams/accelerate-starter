import * as React from 'react';

import { default as AuthModal } from '@Components/AuthModal';
import { default as Header } from '@Components/Header';

interface IProps extends React.Props<{}> {
  getWidth(): number;
}

export const Layout: React.FC<IProps> = ({ getWidth, children }) => (
  <div className={'title'}>
    <AuthModal />
    <Header getWidth={getWidth}>{children}</Header>
  </div>
);
