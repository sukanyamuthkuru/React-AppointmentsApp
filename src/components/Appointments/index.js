import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    title: '',
    date: new Date(),
    appointmentsList: [],
    isActive: false,
  }

  onClickstarredFilter = () => {
    const {isActive} = this.state
    this.setState({isActive: !isActive})
  }

  clickStar = id => {
    this.setState(preState => ({
      appointmentsList: preState.appointmentsList.map(each => {
        if (each.id === id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  onChageInputElement = event => {
    this.setState({title: event.target.value})
  }

  onChangeDateElement = event => {
    const newdate = event.target.value

    this.setState({date: newdate})
  }

  onClickAddButton = () => {
    const {title, date} = this.state
    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      isStarred: false,
    }
    this.setState(preState => ({
      appointmentsList: [...preState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  render() {
    const {title, date, appointmentsList, isActive} = this.state
    const filteredList = appointmentsList.filter(each => {
      if (each.isStarred === true) {
        return each
      }
      return ''
    })
    const all = isActive ? filteredList : appointmentsList
    const starFilterClassName = isActive ? 'active' : 'inActive'
    return (
      <div className="app-container">
        <div className="card-container">
          <div className="first-part">
            <div className="inputs-container">
              <h1 className="appointment-heading">Add Appointment</h1>
              <div className="input-text-container">
                <label htmlFor="title" className="input-styling-label">
                  TITLE
                </label>
                <input
                  type="text"
                  value={title}
                  id="title"
                  className="input-styling-text"
                  onChange={this.onChageInputElement}
                />
              </div>
              <div className="input-date-container">
                <label htmlFor="date" className="input-styling-label">
                  DATE
                </label>
                <input
                  type="date"
                  value={date}
                  id="date"
                  className="input-styling-text"
                  onChange={this.onChangeDateElement}
                />
              </div>
              <button
                type="button"
                className="add-button"
                onClick={this.onClickAddButton}
              >
                Add
              </button>
            </div>
            <div className="image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>
          <div className="second-part">
            <div className="heading-and-button-container">
              <h1 className="heading-appointments">Appointments</h1>
              <button
                type="button"
                className={starFilterClassName}
                onClick={this.onClickstarredFilter}
              >
                Starred
              </button>
            </div>

            <ul className="unordered-container">
              {all.map(each => (
                <AppointmentItem
                  key={each.id}
                  details={each}
                  clickStar={this.clickStar}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
