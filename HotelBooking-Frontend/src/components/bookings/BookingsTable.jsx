import React, { useEffect, useState } from 'react'
import { parseISO } from 'date-fns'
import DateSlider from '../common/DateSlider'
import moment from "moment"

const BookingsTable = ({bookingInfo, handleBookingCancellation}) => {
    const[filteredBookings, setFilteredBookings] = useState(bookingInfo)

    const filteredBooking = (startDate, endDate)=>{
        let filtered = bookingInfo
        if(startDate && endDate){
            filtered = bookingInfo.filter((booking)=>{
                const bookingStartDate = parseISO(booking.checkInDate) 
                const bookingEndDate = parseISO(booking.checkOutDate)
                return bookingStartDate >= startDate && bookingEndDate
                <= endDate && bookingEndDate > startDate
            })
        } 
        setFilteredBookings(filtered)
    }

    useEffect(() => {
        setFilteredBookings(bookingInfo)
    }, [bookingInfo])

  return (
    <section className='p-4'>
       {/*   <DateSlider onDateChange={filteredBooking} onFilterChange={filteredBooking}/> */}
          <table className='table table-bordered table-hover shadow'>
            <thead>
                <tr>
                    <th>S/N</th>
                    <th>Booking ID</th>
                    <th>Room Id</th>
                    <th>Room Type</th>
                    <th>Check-In Date</th>
                    <th>Check-Out Date</th>
                    <th>Guest Name</th>
                    <th>Guest Email</th>
                    <th>Adults</th>
                    <th>Children</th>
                    <th>Confirmation code</th>
                    <th colSpan={2}>Actions</th>
                </tr>
            </thead>
            <tbody className="text-center">
					{filteredBookings.slice().reverse().map((booking, index) => (
						<tr key={booking.id}>
							<td>{index + 1}</td>
							<td>{booking.id}</td>
							<td>{booking.room.id}</td>
							<td>{booking.room.roomType}</td>
							<td>{moment(booking.checkInDate).subtract(1, "month").format("MMM Do, YYYY")}</td>
                            
						    <td>{moment(booking.checkOutDate).subtract(1, "month").format("MMM Do, YYYY")}</td>
							<td>{booking.guestName}</td>
							<td>{booking.guestEmail}</td>
							<td>{booking.numOfAdults}</td>
							<td>{booking.numOfChildren}</td>
							<td>{booking.bookingConfirmationCode}</td>
							<td>
								<button
									className="btn btn-danger btn-sm"
									onClick={() => handleBookingCancellation(booking.id)}>
									Cancel
								</button>
							</td>
						</tr>
					))}
				</tbody>
          </table>
          {filteredBooking.length === 0 && <p>No booking found for the selected dates</p>}
    </section>
  )
}

export default BookingsTable