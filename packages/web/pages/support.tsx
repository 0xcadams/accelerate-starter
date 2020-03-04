import * as React from 'react';
import { connect } from 'react-redux';

import {
  Button,
  createStyles,
  Paper,
  TextField,
  Theme,
  Typography,
  WithStyles,
  withStyles
} from '@material-ui/core';

import { ISupportRequest } from '@accelerate-starter/core';
import * as SupportRequestActions from '@actions/SupportRequestActions';
import { IStore, ISupportRequestState, IUserState } from '@reducers';

const mapDispatchToProps = {
  createSupportRequest: SupportRequestActions.createSupportRequest.request
};

const styles = (theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(4),
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: theme.breakpoints.values.md
    },
    intro: {
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: theme.breakpoints.values.sm
    },
    form: {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: theme.spacing(6),
      maxWidth: theme.breakpoints.values.sm,
      padding: theme.spacing(4)
    },
    formWrapper: {
      width: '100%',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    },
    textField: {
      marginBottom: theme.spacing(1)
    }
  });

interface IStateProps {
  user: IUserState;
  supportRequest: ISupportRequestState;
}

type IProps = IStateProps &
  typeof mapDispatchToProps &
  WithStyles<typeof styles>;

const SupportPage: React.FC<IProps> = ({
  classes,
  createSupportRequest,
  supportRequest,
  user: { isFetching, user }
}) => {
  const [issue, setIssue] = React.useState('');

  const onFormSubmit = () => {
    if (user) {
      const supportRequest: ISupportRequest = { issue, type: 'support' };
      createSupportRequest(supportRequest);
    }
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.intro}>
          <Typography gutterBottom align="center" variant="h4">
            Support
          </Typography>

          <Typography gutterBottom align="center" variant="h6">
            How can we help you?
          </Typography>
        </div>

        <div className={classes.formWrapper}>
          <Paper className={classes.form}>
            {supportRequest.supportRequest &&
            supportRequest.supportRequest.issue ? (
              <Typography gutterBottom align="center" variant="body1">
                Your support request, "{supportRequest.supportRequest.issue}",
                has been submitted! Thank you for taking the time to reach out.
                We will get back to you as soon as we can.
              </Typography>
            ) : user ? (
              <>
                <TextField
                  id="support-issue"
                  label="What issue(s) are you facing?"
                  className={classes.textField}
                  value={issue}
                  multiline
                  fullWidth
                  onChange={(e) => setIssue(e.target.value)}
                  margin="normal"
                  variant="outlined"
                  disabled={isFetching}
                />
                <Button
                  id="support-ok-btn"
                  onClick={onFormSubmit}
                  fullWidth
                  size="large"
                  color="primary"
                  variant="contained"
                  disabled={
                    !Boolean(issue && issue.length > 10) ||
                    isFetching ||
                    supportRequest.isFetching
                  }
                >
                  Submit
                </Button>
              </>
            ) : (
              <Typography gutterBottom align="center" variant="body1">
                Please log in or create an account to submit a support ticket.
                This helps us to solve the problems you are facing significantly
                faster. If you are having issues creating an account or do not
                have an account, please email{' '}
                <a href={'mailto:support@accelerate-starter.com'}>
                  support@accelerate-starter.com
                </a>
                .
              </Typography>
            )}
          </Paper>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: IStore): IStateProps => ({
  supportRequest: state.supportRequest,
  user: state.user
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SupportPage));
