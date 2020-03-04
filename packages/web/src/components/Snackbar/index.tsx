import * as React from 'react';
import { connect } from 'react-redux';

import { Snackbar as MuiSnackbar } from '@material-ui/core';

import * as SnackbarActions from '@actions/SnackbarActions';
import { ISnackbarState, IStore } from '@reducers';

const mapDispatchToProps = {
  hideSnackbar: SnackbarActions.hideSnackbar
};

export const Snackbar: React.FC<typeof mapDispatchToProps & ISnackbarState> = ({
  hideSnackbar,
  message
}) => (
  <MuiSnackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left'
    }}
    open={Boolean(message)}
    autoHideDuration={6000}
    onClose={() => hideSnackbar()}
    ContentProps={{
      'aria-describedby': 'Error message'
    }}
    message={<span id="message-id">{message}</span>}
  />
);

const mapStateToProps = (state: IStore): ISnackbarState => state.snackbar;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Snackbar);
