import * as React from 'react';
import { connect } from 'react-redux';

import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
  Button,
  Typography
} from '@material-ui/core';

import { createMessage, getMessages } from '@actions/MessageActions';

import Loading from '@components/Loading';

import { IStore, IMessageState, IUserState } from '@reducers';

const styles = (theme: Theme) =>
  createStyles({
    landingContainer: {
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(20),
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      maxWidth: theme.breakpoints.values.md
    }
  });

interface IStateProps {
  user: IUserState;
  message: IMessageState;
}

const mapDispatchToProps = {
  createMessage: createMessage.request,
  getMessages: getMessages.request
};

type IProps = WithStyles<typeof styles> &
  IStateProps &
  typeof mapDispatchToProps & { pageContext: { isMobile: boolean } };

const HomePage: React.FC<IProps> = ({
  classes,
  message,
  user,
  createMessage,
  getMessages
}) => {
  return (
    <>
      {user.isFetching ? (
        <Loading />
      ) : user.user ? (
        <div className={classes.landingContainer}>
          <Typography variant="h4">Messages</Typography>
          {message.messages.map((message) => (
            <Typography variant="body1">
              {message.user.name}: {message.message}
            </Typography>
          ))}
          <Button
            color="primary"
            variant="outlined"
            disabled={message.isFetching}
            onClick={() =>
              user.user &&
              createMessage({
                user: user.user,
                message: `My favorite number is ${Math.round(
                  Math.random() * 1000
                )}!`
              })
            }
          >
            Add Message
          </Button>
          <Button
            variant="outlined"
            disabled={message.isFetching}
            onClick={() => user.user && getMessages()}
          >
            Refresh Messages
          </Button>
        </div>
      ) : (
        <div className={classes.landingContainer}>
          <Typography variant="h6">
            You must log in to test Accelerate!
          </Typography>
        </div>
      )}
    </>
  );
};

export default withStyles(styles)(
  connect(
    (state: IStore): IStateProps => ({
      message: state.message,
      user: state.user
    }),
    mapDispatchToProps
  )(HomePage)
);
