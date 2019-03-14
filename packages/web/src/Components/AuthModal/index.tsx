import * as React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Checkbox,
  Form,
  Grid,
  Message,
  Modal
} from 'semantic-ui-react';

import * as emailValidator from 'email-validator';

import * as AuthActions from '@Actions/AuthActions';
import { IUser } from '@Models/User';
import { IAuthModalState, IStore } from '@Reducers';

// type IProps = typeof AuthActions.actions & IAuthModalState;

interface IState extends IUser {
  readonly emailError?: string;
  readonly passwordError?: string;
}

const passwordLengthMinimum = 6;

const initialState = {
  email: '',
  emailError: undefined,
  name: '',
  password: '',
  passwordError: undefined
};

class AuthModal extends React.Component<any, IState> {
  // TODO fix these types
  public state = initialState;

  public render(): JSX.Element {
    const {
      isModalShowing,
      isSignUp,
      toggleAuthModal,
      isFetching,
      error: requestErrorObj
    } = this.props;

    const { email, password, name, emailError, passwordError } = this.state;

    const mainActionText = isSignUp ? 'Sign Up' : 'Log In';

    const requestError = undefined; // requestErrorObj && requestErrorObj.message;

    const error = (isSignUp && (passwordError || emailError)) || requestError;

    return (
      <Modal
        size="tiny"
        open={isModalShowing}
        onClose={() => toggleAuthModal({ showModal: false })}
      >
        <Modal.Header>{mainActionText}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Grid
              textAlign="center"
              style={{ height: '100%' }}
              verticalAlign="middle"
            >
              <Grid.Column>
                <Form
                  onSubmit={this._onSubmit}
                  loading={isFetching}
                  error={Boolean(error)}
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
                      onChange={this._onChangeName}
                    />
                  )}
                  <Form.Input
                    id="auth-modal-email"
                    value={email}
                    error={Boolean(emailError)}
                    fluid
                    icon="at"
                    iconPosition="left"
                    placeholder="E-mail address"
                    type="email"
                    onChange={this._onChangeEmail}
                  />
                  <Form.Input
                    id="auth-modal-password"
                    value={password}
                    error={Boolean(passwordError)}
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    onChange={this._onChangePassword}
                  />

                  <Message
                    error
                    // header="Action Forbidden"
                    content={passwordError || emailError || requestError}
                  />

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
  }

  private _onChangeEmail = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    event.preventDefault();

    const email = event.target.value;

    const isEmailValid = emailValidator.validate(email);

    this.setState({
      email,
      emailError: !isEmailValid ? 'Email must be valid.' : undefined
    });
  }

  private _onChangeName = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    event.preventDefault();

    const name = event.target.value;

    this.setState({
      name
    });
  }

  private _onChangePassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    event.preventDefault();

    const password = event.target.value;

    this.setState({
      password,
      passwordError:
        password.length < passwordLengthMinimum
          ? `Password must be at least ${passwordLengthMinimum} characters.`
          : undefined
    });
  }

  private _onSubmit = (): void => {
    const { email, password, name } = this.state;

    if (this.props.isSignUp) {
      this.props.createUser({ email, password, name });
    } else {
      this.props.authenticateUser({ email, password });
    }

    this.setState({ ...initialState });
  }
}

const mapStateToProps = (state: IStore): IAuthModalState => state.auth;

export default connect(
  mapStateToProps,
  {
    authenticateUser: AuthActions.authenticateUser.request,
    createUser: AuthActions.createUser.request,
    toggleAuthModal: AuthActions.toggleAuthModal
  }
)(AuthModal);
