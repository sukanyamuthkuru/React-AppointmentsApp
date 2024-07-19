import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {details, clickStar} = props
  const {id, title, date, isStarred} = details
  const star = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    clickStar(id)
  }
  const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
  return (
    <li className="list-item-container">
      <div className="name-and-star-container">
        <p className="name-hading">{title}</p>
        <button
          type="button"
          onClick={onClickStar}
          data-testid="star"
          className="star-button"
        >
          <img src={star} alt="star" />
        </button>
      </div>
      <p className="date-para">{`Date: ${formattedDate}`}</p>
    </li>
  )
}

export default AppointmentItem
