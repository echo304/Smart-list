// @flow
import React, { Component } from 'react';
import {
  AsyncStorage,
  Text,
  View,
  TouchableHighlight,
  AlertIOS,
  ActivityIndicatorIOS,
  Image
} from 'react-native';

import styles from '../styles/styles.js';
import AuthForm from '../containers/AuthFormContainer.js';

export default class AuthScreen extends Component {

  constructor(props) {
    super(props);
  }

  _userSignup = (creds) => {
      this.props.signupUser(creds);
  }

  _userLogin = (creds) => {
      this.props.loginUser(creds);
  }

  _displayError = (message) => {
    return(
      <View>
        <Text style={ styles.error }>{ message }</Text>
      </View>
    )
  }

  componentWillUnmount = () => {
    this.props.resetDisplay();
  }

  render() {
    const {
      isFetching,
      formType,
      isAuthenticated,
      loginError,
      loginErrorMsg,
      signupError,
      signupErrorMsg
    } = this.props;
    let handler = formType === 'signup' ? this._userSignup : this._userLogin;
    let spinner = isFetching ?
      ( <ActivityIndicatorIOS
        hidden='true'
        size='large'/> ) :
      ( <View/> );

    return (
        <View style={ styles.footer }>
          <Image source={require('../assets/gradient-login.jpg')} style={styles.image}>

          <View>
            <Text style={ styles.signUpTitle } onPress={() => console.log(this.props)} >followthru</Text>
            { loginError === true && formType === "login" ? this._displayError(loginErrorMsg) : null }
            { signupError === true && formType === "signup" ? this._displayError(signupErrorMsg) : null }
            { spinner }
            <AuthForm formType={formType} onSubmit={handler}/>
          </View>
          </Image>
        </View>

    );
  }
};
