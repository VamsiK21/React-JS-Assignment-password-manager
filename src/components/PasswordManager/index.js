import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

const noPasswordUrl =
  'https://assets.ccbp.in/frontend/react-js/no-passwords-img.png'

class PasswordManager extends Component {
  state = {
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    passwordDetailsList: [],
    searchInput: '',
    showPassword: false,
  }

  onAddPassword = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state

    const initialBackgroundColorClassName =
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]

    const newDetails = {
      id: uuidv4(),
      website: websiteInput,
      username: usernameInput,
      password: passwordInput,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      passwordDetailsList: [...prevState.passwordDetailsList, newDetails],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onChangeWebsite = event => {
    this.setState({
      websiteInput: event.target.value,
    })
  }

  onChangeUsername = event => {
    this.setState({
      usernameInput: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      passwordInput: event.target.value,
    })
  }

  getNoPasswordImage = () => (
    <div className="no-password-container">
      <img className="no-password-img" src={noPasswordUrl} alt="no passwords" />
      <p className="no-password-text">No Passwords</p>
    </div>
  )

  deleteList = id => {
    const {passwordDetailsList} = this.state
    const deletedList = passwordDetailsList.filter(
      eachItem => eachItem.id !== id,
    )

    this.setState({
      passwordDetailsList: deletedList,
    })
  }

  onChangedCheckBox = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  getPasswordItems = filteredDetails => {
    const {showPassword} = this.state

    return (
      <ul className="passwords-list-container">
        {filteredDetails.map(eachItem => (
          <PasswordItem
            deleteList={this.deleteList}
            passwordDetails={eachItem}
            key={eachItem.id}
            showPassword={showPassword}
          />
        ))}
      </ul>
    )
  }

  getSearchInput = filteredDetails => (
    <div className="count-searchInput-container">
      <div className="count-container">
        <h1 className="your-password-text">Your Passwords</h1>
        <p className="count-btn" type="button">
          {filteredDetails.length}
        </p>
      </div>

      <div className="search-container">
        <button type="button" className="btn-search">
          <img
            className="search-icon"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
            alt="search"
          />
        </button>
        <input
          onChange={this.onChangeSearchInput}
          type="search"
          className="search-input"
          placeholder="Search"
        />
      </div>
    </div>
  )

  render() {
    const {
      websiteInput,
      usernameInput,
      passwordInput,
      passwordDetailsList,
      searchInput,
      showPassword,
    } = this.state

    const filteredDetails = passwordDetailsList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    const listLength = filteredDetails.length

    return (
      <div className="bg-container">
        <div>
          <img
            className="password-logo"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
          />
        </div>

        <div className="top-section">
          <form
            className="password-input-container"
            onSubmit={this.onAddPassword}
          >
            <h1 className="add-text">Add New Password</h1>

            <div className="website-input-container">
              <button className="button" type="button">
                <img
                  className="website-image"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                />
              </button>
              <input
                className="input-style"
                type="text"
                placeholder="Enter Website"
                onChange={this.onChangeWebsite}
                value={websiteInput}
              />
            </div>

            <div className="website-input-container">
              <button className="button" type="button">
                <img
                  className="website-image"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                />
              </button>
              <input
                className="input-style"
                type="text"
                placeholder="Enter Username"
                onChange={this.onChangeUsername}
                value={usernameInput}
              />
            </div>

            <div className="website-input-container">
              <button className="button" type="button">
                <img
                  className="website-image"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                />
              </button>
              <input
                className="input-style"
                type="password"
                placeholder="Enter Password"
                onChange={this.onChangePassword}
                value={passwordInput}
              />
            </div>
            <button className="add-btn" type="submit">
              Add
            </button>
          </form>

          <div className="pass-manager-card">
            <img
              className="password-manager-image-lg"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
            />

            <img
              className="password-manager-image-sm"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
            />
          </div>
        </div>
        <div className="bottom-section">
          {this.getSearchInput(filteredDetails)}
          <hr className="hr-line" />
          <div className="check-box-container">
            <input
              type="checkbox"
              className="checkbox-input"
              id="checkBoxInput"
              onChange={this.onChangedCheckBox}
              value={showPassword}
            />
            <label htmlFor="checkBoxInput" className="label-text">
              Show Passwords
            </label>
          </div>
          {listLength > 0
            ? this.getPasswordItems(filteredDetails)
            : this.getNoPasswordImage()}
        </div>
      </div>
    )
  }
}

export default PasswordManager
