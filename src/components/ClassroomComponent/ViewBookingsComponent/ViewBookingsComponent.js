import React from 'react'
import Paper from 'material-ui/Paper'
import DatePicker from 'material-ui/DatePicker'
import RoomsContainer from './Rooms'
import { connect } from 'react-redux'
import moment from 'moment'
import { fetchRooms, getDisabledDates, getBookingDetails } from '../../../Services/firebaseDBService'
import { EventDetails } from './EventDetailsComponent'

class ViewBooking extends React.Component {
  constructor (props) {
    super(props)

    const maxDate = new Date()
    maxDate.setDate(maxDate.getDate() + 30)
    maxDate.setHours(0, 0, 0, 0)
    this.state = {
      minDate: new Date(),
      maxDate: maxDate,
      selectedDate: null,
      dateSelected: false,
      takenRooms: [],
      fetchingRooms: true,
      isRoomSelected: false,
      selectedRoom: null,
      fetchingEventData: false,
      eventDetails: null
    }

    this.handleDate = this.handleDate.bind(this)
    this.formatDate = this.formatDate.bind(this)
    this.getTakenRooms = this.getTakenRooms.bind(this)
  }

  componentDidMount () {
    getDisabledDates((res) => {
      this.setState({ disabledDates: res })
    })
  }

  handleSelectedRoom (temp) {
    this.setState({ selectedRoom: temp, isRoomSelected: true, fetchingEventData: true }, () => {
      this.fetchBookingDetails()
      console.log(this.state.selectedRoom)
    })
  }

  getTakenRooms () {
    let scope = this
    this.setState({ dateSelected: true, fetchingRooms: true })
    fetchRooms(this.state.selectedDate, this.state.selectedDate)
      .then(function (res) {
        scope.setState({ takenRooms: res, fetchingRooms: false })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  handleDate (event, date) {
    this.setState({ selectedDate: date, isRoomSelected: false })
    this.getTakenRooms()
  }

  fetchBookingDetails () {
    getBookingDetails(this.state.selectedDate, this.state.selectedRoom)
      .then((event) => {
        console.log(event)
        this.setState({ eventDetails: event, fetchingEventData: false })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  formatDate (date) {
    return moment(date).format('ddd, DD MMM YYYY')
  }

  render () {
    return (
      <div>
        <Paper style={{ width: this.props.isMobile ? '98%' : '90%', height: '100%', margin: 'auto', marginTop: '2%', marginBottom: '2%', minHeight: 600 }} zDepth={3}>
          <div style={{ backgroundColor: '', width: '100%', alignSelf: 'center', display: 'flex', textAlign: 'center', justifyContent: 'center' }}>
            <div style={{ width: this.props.isMobile ? '95%' : '85%' }}>
              <div className='locationContainer' style={{ marginBottom: 50 }}>
                <div style={{ backgroundColor: '', display: 'flex', flexDirection: this.props.isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <DatePicker
                    floatingLabelText='Date'
                    mode={this.props.isMobile ? 'portrait' : 'landscape'}
                    autoOk
                    onChange={this.handleDate}
                    value={this.state.selectedDate}
                    disableYearSelection
                    minDate={this.state.minDate}
                    maxDate={this.state.maxDate}
                    formatDate={this.formatDate}
                    shouldDisableDate={this.shouldDisableDate}
                    required
                  />
                </div>
                <RoomsContainer datesSelected={this.state.dateSelected} fetchingRooms={this.state.fetchingRooms} takenRooms={this.state.takenRooms} handleSelectedRoom={(temp) => this.handleSelectedRoom(temp)} />
                <div style={{ marginTop: '20px', textAlign: 'left' }}>
                  <EventDetails isRoomSelected={this.state.isRoomSelected} fetchingEventData={this.state.fetchingEventData} eventDetails={this.state.eventDetails} />
                </div>
              </div>
            </div>
          </div>
        </Paper>
      </div>)
  }
}

function mapStateToProps (state) {
  const { isMobile } = state.toggler
  const { user } = state.authentication
  return {
    isMobile,
    user
  }
}

export default connect(mapStateToProps)(ViewBooking)
