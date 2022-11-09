
import { bookingTicket } from "../slices/slices";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

import "./money.scss";

const Money = ({ ticketId, tickets, checkList }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);

	const seatList = checkList?.reduce((total, item) => {
		return total + " Ghế " + item.tenGhe + ", ";
	}, "");

	const totalPrice = checkList.reduce((total, item) => {
		return total + item.giaVe;
	}, 0);

	const infoBooking = {
		maLichChieu: ticketId,
		danhSachVe: checkList,
	};

	console.log(infoBooking);

	const handleTicket = async () => {
		if (!user) {
			await Swal.fire({
				icon:'warning',
				title:'Vui lòng đăng nhập để đặt vé'
			})
			navigate("/login");
		} else {
			if (seatList) {
				try {
					await dispatch(bookingTicket(infoBooking)).unwrap();
					await Swal.fire({
						icon:'success',
						title:'Đặt vé thành công',
					})
					navigate("/user");
				} catch (error) {
					Swal.fire({
						icon:'error',
						title:'Đặt vé thất bại',
						text:error
					})
				}
			} else {
				Swal.fire({
					icon:'warning',
					title:'Vui lòng chọn ghế',
				})
			}
		}
	};

	return (
		<div className="book">
			<div className="book-details">
				<div className="book-title">
					<div className="book-img">
						<img
							width={150}
							height={200}
							src={tickets?.thongTinPhim.hinhAnh}
							alt={tickets?.thongTinPhim.tenPhim}
						/>
					</div>
					<h1 className="book-name">{tickets?.thongTinPhim.tenPhim}</h1>
				</div>

				<div className="book-info">
					<div className="book-item">
						<h3>Cụm rạp:</h3>
						<p>{tickets?.thongTinPhim.tenCumRap}</p>
					</div>

					<div className="book-item">
						<h3>Tên rạp:</h3>
						<p>{tickets?.thongTinPhim.tenRap}</p>
					</div>

					<div className="book-item">
						<h3>Ngày giờ chiếu:</h3>
						<p>
							{tickets?.thongTinPhim.ngayChieu}
							<span> - </span>
							<span style={{ color: "red" }}>
								{tickets?.thongTinPhim.gioChieu}
							</span>
						</p>
					</div>

					<div className="book-item">
						<h3>Địa chỉ:</h3>
						<p>{tickets?.thongTinPhim.diaChi}</p>
					</div>

					<div className="book-item list">
						<h3>Ghế đã chọn:</h3>
						<p className="book-list">{seatList}</p>
					</div>
				</div>

				<div className="book-buy">
					<div className="buy">
						<h3 className="total">Thành Tiền: </h3>
						<p className="price">{Number(totalPrice).toLocaleString()} VNĐ</p>
					</div>

					<div className="book-btn">
						<button className="book-btn" onClick={handleTicket}>
							ĐẶT VÉ
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Money;
