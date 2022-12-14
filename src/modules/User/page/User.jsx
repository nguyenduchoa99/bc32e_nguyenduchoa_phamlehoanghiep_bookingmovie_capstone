import useRequest from "../../../hooks/useRequest";
import React from "react";
import quanLyNguoiDungService from "../../../services/quanLyNguoiDungService";
import cn from "classnames";
import UserBooking from "../UserBooking/UserBooking";
import UserInfo from "../UserInfo/UserInfo";

import "./user.scss";


const User = () => {

	const { data: userInfo } = useRequest(() => quanLyNguoiDungService.getUserInfo());

	const numTickets = userInfo?.thongTinDatVe.reduce((total, item) => {
		return total + item.danhSachGhe.length;
	}, 0);

	const numBooking = userInfo?.thongTinDatVe.length;

	return (
		<div style={{ marginTop: "64px" }} className="user">
			<div className="user-main">
				<div className="user-info">
					<p className="user-photo">
						{userInfo?.taiKhoan.slice(0, 1).toUpperCase()}
					</p>
					<p className="user-name">{userInfo?.hoTen}</p>
					<p
						className={cn("user-type text-blue-700", {
							"text-red-500": userInfo?.maLoaiNguoiDung === "QuanTri",
						})}
					>
						{userInfo?.loaiNguoiDung.tenLoai}
					</p>

					<div className="user-info-booking">
						<p className='text-booking'>
							Số lần đặt vé:{" "}
							<strong className="text-orange-500">{numBooking}</strong>
						</p>
						<p className='text-booking'>
							Số vé đã đặt:{" "}
							<strong className="text-orange-500">{numTickets}</strong>
						</p>
					</div>
				</div>

				<div className="user-show">
					<div className="infomation">
						<UserInfo userInfo={userInfo} />
					</div>

					<div className="history">
						<UserBooking userInfo={userInfo} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default User;
