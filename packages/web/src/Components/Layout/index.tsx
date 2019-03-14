import * as React from 'react';

import { default as Header } from '@Components/Header';

interface IProps extends React.Props<{}> {
  getWidth(): number;
}

export class Layout extends React.Component<IProps, {}> {
  public render(): JSX.Element {
    const { getWidth } = this.props;

    return (
      <div className={'title'}>
        <Header getWidth={getWidth}>{this.props.children}</Header>
      </div>
    );
  }
}
