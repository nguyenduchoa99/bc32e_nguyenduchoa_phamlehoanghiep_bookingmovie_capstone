import { DatePicker } from "antd";
import quanLyPhimService from "../../../../services/quanLyPhimService";
import dayjs from "dayjs";
import useRequest from "../../../../hooks/useRequest";
import {
	addTheater,
	getCinemaSystem,
	getCinemaTheater,
} from "../../slices/adminSlice";
import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

import './addShowTimes.scss'


const AddShowTimes = () => {


	const dispatch = useDispatch();
	const { movieId } = useParams();

	const { data: movie } = useRequest(() => quanLyPhimService.getMovieDetails(movieId));

	const { cinemaSystem, cinemaTheater } = useSelector((state) => state.admin);

	useEffect(() => {
		dispatch(getCinemaSystem());
	}, []);

	const { register, handleSubmit, setValue } = useForm({
		defaultValues: {
			maPhim: movieId,
			maRap: "",
			ngayChieuGioChieu: "",
			giaVe: "",
		},
		mode: "onTouched",
	});

	const onSubmit = async (values) => {
		console.log(values);
		try {
			await dispatch(addTheater(values));
			Swal.fire({
				icon: 'success',
				title: 'Thêm lịch chiếu thành công',
			})
		} catch (error) {
			Swal.fire({
				icon: 'error',
				title: 'Thêm lịch chiếu thất bại',
				text: error,
			})
		}
	};

	const handleChange = (e) => {
		const { value } = e.target;
		dispatch(getCinemaTheater(value));
	};

	const handleDateTime = (value) => {
		setValue("ngayChieuGioChieu", dayjs(value).format("DD/MM/YYYY hh:mm:ss"));
	};

	const handlePrice = (price) => {
		setValue("giaVe", price);
	};

	return (
		<div className="add-showtimes">
			<h1 className="text-orange-500 mb-5 text-[30px] font-semibold">Thêm Lịch Chiếu</h1>

			<div className="flex">
				<div className="mt-3 text-center w-100">
					<img
						src={movie?.hinhAnh}
						alt={movie?.maPhim}
						width={250}
						height={350}
					/>
					<h5 className="text-red-500 text-[25px] mt-3">{movie?.tenPhim}</h5>
				</div>

				<form className="pt-4 w-75 m-auto" onSubmit={handleSubmit(onSubmit)}>
					<div className="form-group mb-4">
						<label className="form-label">Hệ Thống Rạp</label>
						<select className="form-select" type="text" onChange={handleChange}>
							{cinemaSystem?.map((cinemaName) => {
								return (
									<option
										key={cinemaName.maHeThongRap}
										value={cinemaName.maHeThongRap}
									>
										{cinemaName.tenHeThongRap}
									</option>
								);
							})}
						</select>
					</div>
					<div className="form-group mb-4">
						<label className="form-label">Cụm Rạp</label>
						<select className="form-select" {...register("maRap")}>
							{cinemaTheater?.map((cinemaAddress) => {
								return (
									<option
										key={cinemaAddress.maCumRap}
										value={cinemaAddress.maCumRap}
									>
										{cinemaAddress.tenCumRap}
									</option>
								);
							})}
						</select>
					</div>
					<div className="form-group mb-4">
						<label className="form-label d-block">Ngày Giờ Chiếu</label>
						<input
							type='date'
							format={"DD/MM/YYYY"}
							placeholder="Chọn ngày giờ"
							
							className='data-1'
							onChange={handleDateTime}
						/>
					</div>
					<div className="form-group mb-4">
						<label className="form-label d-block">Giá Vé</label>
						<input
							className="form-select"
							placeholder="Chọn giá vé"
							min={75000}
							max={200000}
							onChange={handlePrice}
						/>
					</div>

					<div className="mt-5">
						<button className="btn-add-theater">Thêm Lịch Chiếu</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddShowTimes;
