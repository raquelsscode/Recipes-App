import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import rockGlass from '../images/rockGlass.svg';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      btnDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.verify());
  }

  verify = () => {
    const { email, password } = this.state;
    const num = 7;
    const pattern = /\S+@\S+.com/;
    if (password.length >= num && pattern.test(email)) {
      this.setState({
        btnDisabled: false,
      });
    } else {
      this.setState({
        btnDisabled: true,
      });
    }
  }

    handleClick = async (event) => {
      console.log('teste');
      event.preventDefault();
      const { history } = this.props;
      const { email } = this.state;
      const user = {
        email,
      };
      localStorage.setItem('mealsToken', 1);
      localStorage.setItem('cocktailsToken', 1);
      localStorage.setItem('user', JSON.stringify(user));
      history.push('/foods');
    }

    render() {
      const { email, password, btnDisabled } = this.state;
      return (
        <section>

          <div className="meals">
            <span className="logo">Receitas</span>
            <object
              className="rocksGlass"
              type="image/svg+xml"
              data={ rockGlass }
            >
              Glass
            </object>
            <form>
              <input
                type="email"
                name="email"
                value={ email }
                data-testid="email-input"
                placeholder="Insira seu Email"
                onChange={ this.handleChange }
              />
              <input
                type="password"
                name="password"
                value={ password }
                data-testid="password-input"
                onChange={ this.handleChange }
                placeholder="Insira sua senha"
              />
              <button
                type="submit"
                data-testid="login-submit-btn"
                disabled={ btnDisabled }
                onClick={ this.handleClick }
              >
                Enter
              </button>

            </form>
          </div>
        </section>
      );
    }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
