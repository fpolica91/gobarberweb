import React, { useState, useCallback, useEffect, useMemo } from 'react'
import {format, isToday} from 'date-fns'
import { FiPower, FiClock } from 'react-icons/fi'
import DayPicker, { DayModifiers } from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import logoImg from '../../components/assets/logo.svg'
import api from '../../services/api'
import { useAuth } from '../../context/AuthContext'
import {
  Container,
  Header,
  HeaderContent,
  NextAppointment,
  Profile,
  Content,
  Schedule,
  Section,
  Calendar,
  Appointment,
} from './styles'

export interface DashboardProps {}

interface MonthAvailability {
  day: number
  available: boolean
}

const Dashboard: React.FC<DashboardProps> = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailability[]
  >([])

  const handleDatechange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day)
    }
  }, [])

  const disabledays = useMemo(() => {
    const dates = monthAvailability
      .filter((monthDay) => !monthDay.available)
      .map((monthDay) => {
        const year = currentMonth.getFullYear()
        const month = currentMonth.getMonth()
        return new Date(year, month, monthDay.day)
      })
    return dates
  }, [currentMonth, monthAvailability])


  const selectedDateAsText = useMemo(()=>{
    return format(selectedDate, " dd 'of' MMMM ")
  },[selectedDate])

  const selectedWeekDay = useMemo(()=>{
    return format(selectedDate, 'cccc')
  },[selectedDate])


  const { singOut, user } = useAuth()

  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then((response) => {
        setMonthAvailability(response.data)
      })
  }, [currentMonth, user.id])

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month)
  }, [])

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="goBarber" />
          <Profile>
            <img
              src={
                user.avatar_url ||
                'https://api.adorable.io/avatars/56/abott@adorable.io.png'
              }
              alt={user.name}
            />
            <div>
              <span>Welcome</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>
          <button type="button" onClick={singOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
      <Content>
        <Schedule>
          <h1>Scheduled Appointments</h1>
          <p>
            {isToday(selectedDate) &&  <span>Today</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>
          <NextAppointment>
            <strong>Following Appointment</strong>
            <div>
              <img
                src="https://api.adorable.io/avatars/56/apery@adorable.io.png"
                alt="ape"
              />
              <strong>Jesus Garcia</strong>
              <span>
                <FiClock />
                8:00
              </span>
            </div>
          </NextAppointment>
          <Section>
            <strong>Morning</strong>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>
              <div>
                <img
                  src="https://api.adorable.io/avatars/56/apery@adorable.io.png"
                  alt="ape"
                />
                <strong>Jesus Garcia</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>
              <div>
                <img
                  src="https://api.adorable.io/avatars/56/apery@adorable.io.png"
                  alt="ape"
                />
                <strong>Jesus Garcia</strong>
              </div>
            </Appointment>
          </Section>
          <Section>
            <strong>Evening</strong>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>
              <div>
                <img
                  src="https://api.adorable.io/avatars/56/apery@adorable.io.png"
                  alt="ape"
                />
                <strong>Jesus Garcia</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>
              <div>
                <img
                  src="https://api.adorable.io/avatars/56/apery@adorable.io.png"
                  alt="ape"
                />
                <strong>Jesus Garcia</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            disabledDays={[{ daysOfWeek: [0] }, ...disabledays]}
            fromMonth={new Date()}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5, 6] },
            }}
            onMonthChange={handleMonthChange}
            selectedDays={selectedDate}
            onDayClick={handleDatechange}
          />
        </Calendar>
      </Content>
    </Container>
  )
}

export default Dashboard
