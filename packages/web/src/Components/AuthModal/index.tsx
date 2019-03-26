import * as React from 'react';
import { connect } from 'react-redux';

import * as emailValidator from 'email-validator';
import {
  Button,
  Checkbox,
  Form,
  Grid,
  Message,
  Modal
} from 'semantic-ui-react';

import * as AuthActions from '@Actions/AuthActions';
import { IAuthModalState, IStore } from '@Reducers';

const passwordLengthMinimum = 6;

const mapDispatchToProps = {
  createUser: AuthActions.createUser.request,
  authenticateUser: AuthActions.authenticateUser.request,
  toggleAuthModal: AuthActions.toggleAuthModal
};

export const AuthModal: React.FC<
  typeof mapDispatchToProps & IAuthModalState
> = ({
  createUser,
  authenticateUser,
  isModalShowing,
  isSignUp,
  toggleAuthModal,
  isFetching,
  error
}) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState({ value: '', error: '' });
  const [password, setPassword] = React.useState({ value: '', error: '' });

  const requestError =
    error &&
    (error.code === 409
      ? 'Email already exists.'
      : error.code === 401
      ? 'Incorrect login.'
      : '');

  const displayError =
    (isSignUp && (password.error || email.error)) ||
    (!name && !password.value && !email.value && requestError); // only show error text after a user is authenticated

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();

    const newEmail = event.target.value;
    const isEmailValid = emailValidator.validate(newEmail);

    setEmail({
      error: !isEmailValid ? 'Email must be valid.' : '',
      value: newEmail
    });
  };

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setName(event.target.value);
  };

  const onChangePassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    event.preventDefault();

    const newPassword = event.target.value;

    setPassword({
      error:
        newPassword.length < passwordLengthMinimum
          ? `Password must be at least ${passwordLengthMinimum} characters.`
          : '',
      value: newPassword
    });
  };

  const onSubmit = (): void => {
    if (!password.error && !email.error) {
      if (isSignUp) {
        createUser({ name, email: email.value, password: password.value });
      } else {
        authenticateUser({ email: email.value, password: password.value });
      }

      setName('');
      setEmail({ value: '', error: '' });
      setPassword({ value: '', error: '' });
    }
  };

  return (
    <Modal
      size="tiny"
      open={isModalShowing}
      onClose={() => toggleAuthModal({ showModal: false })}
    >
      <Modal.Header>{isSignUp ? 'Sign Up' : 'Log In'}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Grid
            textAlign="center"
            style={{ height: '100%' }}
            verticalAlign="middle"
          >
            <Grid.Column>
              <Form
                onSubmit={onSubmit}
                loading={isFetching}
                error={Boolean(displayError)}
                size="large"
              >
                {isSignUp && (
                  <Form.Input
                    id="auth-modal-name"
                    value={name}
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="Name"
                    onChange={onChangeName}
                  />
                )}
                <Form.Input
                  id="auth-modal-email"
                  value={email.value}
                  error={Boolean(email.error)}
                  fluid
                  icon="at"
                  iconPosition="left"
                  placeholder="E-mail address"
                  type="email"
                  onChange={onChangeEmail}
                />
                <Form.Input
                  id="auth-modal-password"
                  value={password.value}
                  error={Boolean(password.error)}
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  onChange={onChangePassword}
                />

                <Message error content={displayError} />

                {isSignUp && (
                  <Form.Field>
                    <Checkbox
                      id="auth-modal-toc"
                      label="I agree to the Terms and Conditions"
                    />
                  </Form.Field>
                )}

                <Button
                  id="auth-modal-ok-btn"
                  color="teal"
                  icon="checkmark"
                  content="OK"
                  size="large"
                />
              </Form>
            </Grid.Column>
          </Grid>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

const mapStateToProps = (state: IStore): IAuthModalState => state.auth;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthModal);
