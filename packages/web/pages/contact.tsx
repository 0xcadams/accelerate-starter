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
import Link from '@components/Link';
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

const ContactUsPage: React.FC<IProps> = ({
  classes,
  createSupportRequest,
  supportRequest,
  user: { isFetching, user }
}) => {
  const [issue, setIssue] = React.useState('');

  const onFormSubmit = () => {
    const supportRequest: ISupportRequest = { issue, user, type: 'support' };
    createSupportRequest(supportRequest);
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.intro}>
          <Typography gutterBottom align="center" variant="h4">
            Contact Us
          </Typography>

          <Typography gutterBottom align="center" variant="h6">
            We are available to answer any questions!
          </Typography>
        </div>

        <div className={classes.formWrapper}>
          <Paper className={classes.form}>
            {supportRequest.supportRequest &&
            supportRequest.supportRequest.issue ? (
              <Typography gutterBottom align="center" variant="body1">
                Your request, "{supportRequest.supportRequest.issue}", has been
                submitted! Thank you for taking the time to reach out.
              </Typography>
            ) : (
              <>
                <Typography gutterBottom variant="body1">
                  Reach out to us about our Enterprise offerings, data
                  licensing, or any other requests. For bugs or issues found
                  with the site, please go to the{' '}
                  <Link href="/support">support page</Link>.
                </Typography>
                <TextField
                  id="contact-issue"
                  label="What request(s) do you have?"
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
                  id="contact-ok-btn"
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
)(withStyles(styles)(ContactUsPage));
