
import quanLyDatVeService from "../../services/quanLyDatVeService";
import useRequest from "../../hooks/useRequest";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import Seats from "../Booking/Seats/Seats";
import Money from "../Booking/Money/Money";

import "./booking.scss";

const Booking = () => {
	const [checkList, setCheckList] = useState([]);

	const handleChecked = (seat) => {
		const index = checkList.findIndex((seatList) => {
			return seatList.maGhe === seat.maGhe;
		});

		let newList = [...checkList];
		if (index !== -1) {
			newList = newList.filter((item) => {
				return item.maGhe !== seat.maGhe;
			});
		} else {
			newList.push(seat);
		}

		setCheckList(newList);
	};

	const { ticketId } = useParams();

	const {
		data: tickets,
		// isLoading,
		// error,
	} = useRequest(() => quanLyDatVeService.getTicketDetails(ticketId));



	return (
		<div style={{ margin: "64px 0 0" }} className="ticket">
			<div className="ticket-main">
				<div className="ticket-seat-list">
					<Seats
						tickets={tickets}
						checkList={checkList}
						handleChecked={handleChecked}
					/>
				</div>

				<div className="ticket-booking">
					<Money
						ticketId={ticketId}
						tickets={tickets}
						checkList={checkList}
					/>
				</div>
			</div>
		</div>
	);
};

export default Booking;
