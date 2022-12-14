import { DatePicker } from 'antd'
import dayjs from "dayjs";
import { addMovie } from "../../slices/adminSlice";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./addMoive.scss";
import moment from 'moment'

const AddMovie = () => {


	const [imgPreview, setImgPreview] = useState("");

	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: {
			tenPhim: "",
			biDanh: "",
			moTa: "",
			trailer: "",
			hinhAnh: "",
			ngayKhoiChieu: "",
			hot: false,
			dangChieu: false,
			sapChieu: false,
			danhGia: "",
		},
		mode: "onTouched",
	});

	const dispatch = useDispatch();

	const onSubmit = async (values) => {
		try {
			await dispatch(addMovie(values)).unwrap();
			Swal.fire({
				icon: 'success',
				title: 'Thêm phim thành công'
			})
			navigate("/admin/movieList");
		} catch (error) {
			Swal.fire({
				icon: 'error',
				title: 'Thêm phim thất bại',
				text: error,
			})
		}
	};

	const handleDateTime = (value) => {
		setValue("ngayChieuGioChieu", dayjs(value).format("DD/MM/YYYY hh:mm:ss"));
	};

	const handleChangeImage = (evt) => {
		const file = evt.target.files[0];

		if (!file) return;

		setValue("hinhAnh", file);

		const fileReader = new FileReader();
		fileReader.readAsDataURL(file);
		fileReader.onload = (evt) => {
			setImgPreview(evt.target.result);
		};
	};

	return (
		<div className="add-movie">
			<h1 className="text-orange-500 mb-5 text-[30px] font-semibold">Thêm Phim</h1>
			<form className="pt-4" onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label>Tên Phim</label>
					<input
						type="text"
						placeholder="Tên Phim"
						{...register("tenPhim", {
							required: {
								value: true,
								message: "Vui lòng nhập tên phim",
							},
						})}
					/>
					{errors.tenPhim && <p>{errors.tenPhim.message}</p>}
				</div>
				<div>
					<label>Bí Danh</label>
					<input
						type="text"
						placeholder="Bí Danh"
						{...register("biDanh", {
							required: {
								value: true,
								message: "Vui lòng nhập bí danh",
							},
						})}
					/>
					{errors.biDanh && <p>{errors.biDanh.message}</p>}
				</div>
				<div>
					<label>Mô Tả</label>

					<input
						type="text"
						placeholder="Mô Tả"
						{...register("moTa", {
							required: {
								value: true,
								message: "Vui lòng nhập mô tả",
							},
							minLength: {
								value: 10,
								message: "Mô tả ít nhất 10 ký tự",
							},
						})}
					/>
					{errors.moTa && <p>{errors.moTa.message}</p>}
				</div>
				<div>
					<label>Trailer</label>

					<input
						type="text"
						placeholder="Trailer"
						{...register("trailer", {
							required: {
								value: true,
								message: "Vui lòng thêm trailer",
							},
						})}
					/>
					{errors.trailer && <p>{errors.trailer.message}</p>}
				</div>
				<div>
					<label className="d-block">Ngày Khởi Chiếu</label>
					<input
						type='date'
						format={"DD/MM/YYYY"}
						placeholder="Chọn ngày"
						onChange={handleDateTime}
					/>

				</div>
				<div className="form-check form-switch">
					<label className="form-check-label">Hot</label>
					<input
						className="form-check-input check-1 "
						type="checkbox"
						role="switch"
						id="flexSwitchCheckDefault"
						{...register("hot")}
					/>
				</div>
				<div className="form-check form-switch">
					<label className="form-check-label">Đang Chiếu</label>
					<input
						className="form-check-input"
						type="checkbox"
						role="switch"
						id="flexSwitchCheckDefault"
						{...register("dangChieu")}
					/>
				</div>
				<div className="form-check form-switch">
					<label className="form-check-label">Sắp Chiếu</label>
					<input
						className="form-check-input"
						type="checkbox"
						role="switch"
						id="flexSwitchCheckDefault"
						{...register("sapChieu")}
					/>
				</div>
				<div className="div-image">
					<label>Hình Ảnh</label>
					<input
						className="input-image"
						type="file"
						placeholder="Hình Ảnh"
						onChange={handleChangeImage}
					/>
					{imgPreview && (
						<img width={70} height={100} src={imgPreview} alt="preview" />
					)}
				</div>
				<div>
					<label>Đánh Giá</label>

					<input
						type="text"
						placeholder="Đánh Giá"
						{...register("danhGia", {
							required: {
								value: true,
								message: "Vui lòng nhập đánh giá",
							},
							maxLength: {
								value: 2,
								message: "Tối đa 2 ký số",
							},
							pattern: {
								value: /^[0-9]+$/,
								message: "Vui lòng nhập số",
							},
						})}
					/>
					{errors.danhGia && <p>{errors.danhGia.message}</p>}
				</div>

				<div>
					<button className="btn-add">Thêm Phim</button>
				</div>
			</form>
		</div>
	);
};

export default AddMovie;
