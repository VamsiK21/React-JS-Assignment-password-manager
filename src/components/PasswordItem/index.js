import './index.css'

const passwordUrl =
  'https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png'
const deleteUrl =
  'https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png'

const PasswordItem = props => {
  const {passwordDetails, deleteList, showPassword} = props
  const {website, username, password, id, initialClassName} = passwordDetails
  const initial = website ? website[0].toUpperCase() : ''

  const onClickedDelete = () => {
    deleteList(id)
  }

  const getPassword = showPassword ? (
    <p className="user-pass-text">{password}</p>
  ) : (
    <button className="stars-btn" type="button">
      {' '}
      <img className="stars-image" src={passwordUrl} alt="stars" />
    </button>
  )

  return (
    <li className="item-container">
      <div className="initial-container">
        <button
          type="button"
          className={`btn-first-letter ${initialClassName}`}
        >
          {initial}
        </button>
        <div className="pass-details-container">
          <p className="details-text">{website}</p>
          <p className="user-pass-text">{username}</p>
          {getPassword}
        </div>
      </div>
      <button
        data-testid="delete"
        type="button"
        onClick={onClickedDelete}
        className="stars-btn"
      >
        <img className="delete-image" src={deleteUrl} alt="delete" />
      </button>
    </li>
  )
}

export default PasswordItem
