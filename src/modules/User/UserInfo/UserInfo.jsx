import { updateUserClient } from "../../Admin/slices/userSlice";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import "./userInfo.scss";

const UserInfo = ({ userInfo }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		reset({
			taiKhoan: userInfo?.taiKhoan,
			matKhau: userInfo?.matKhau,
			email: userInfo?.email,
			soDt: userInfo?.soDT,
			hoTen: userInfo?.hoTen,
			maLoaiNguoiDung: userInfo?.maLoaiNguoiDung,
		});
	}, [userInfo]);

	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			taiKhoan: "",
			matKhau: "",
			email: "",
			soDt: "",
			hoTen: "",
			maLoaiNguoiDung: "",
		},
		mode: "onTouched",
	});

	const onSubmit = async (values) => {
		console.log(values);
		try {
			await dispatch(updateUserClient(values)).unwrap();
			await Swal.fire({
				icon: 'success',
				title: 'Cập nhật thành công'
			})
		} catch (error) {
			Swal.fire({
				icon: 'error',
				title: 'Cập nhật thất bại',
				text: error
			})
		}
	};

	return (
		<div className="user-update">
			<h1 className="user-title">THÔNG TIN NGƯỜI DÙNG</h1>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<div className="form-group mb-3">

						<label className="form-label">Tài Khoản</label>
						<input
							className="form-control form-account"
							type="text"
							placeholder="Tài khoản"
							disabled
							{...register("taiKhoan", {
								required: {
									value: true,
									message: "Tài khoản không được để trống",
								},
							})}
						/>
						{errors.taiKhoan && (
							<p className="text-red-500">{errors.taiKhoan.message}</p>
						)}
					</div>
					<div className="form-group mb-3">
						<label className="form-label">Mật Khẩu</label>
						<input
							className="form-control form-password"
							type="text"
							placeholder="Mật khẩu"
							{...register("matKhau", {
								required: {
									value: true,
									message: "Mật khẩu không được để trống",
								},
								minLength: {
									value: 6,
									message: "Mật khẩu phải từ 6 đến 16 ký tự",
								},
								maxLength: {
									value: 16,
									message: "Mật khẩu phải từ 6 đến 16 ký tự",
								},
							})}
						/>
						{errors.matKhau && (
							<p className="text-red-500">{errors.matKhau.message}</p>
						)}
					</div>
					<div className="form-group mb-3">
						<label className="form-label">Email</label>
						<input
							className="form-control form-email"
							type="text"
							placeholder="Email"
							{...register("email", {
								required: {
									value: true,
									message: "Email không được để trống",
								},
								pattern: {
									value:
										/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
									message: "Email không đúng định dạng",
								},
							})}
						/>
						{errors.email && (
							<p className="text-red-500">{errors.email.message}</p>
						)}
					</div>



					<div className="form-group mb-3">
						<label className="form-label">Số Điện Thoại</label>
						<input
							className="form-control form-phone"
							type="text"
							placeholder="Số điện thoại"
							{...register("soDt", {
								required: {
									value: true,
									message: "Số điện thoại không được để trống",
								},
								pattern: {
									value: /^[0-9]+$/,
									message: "Số điện thoại không đúng định dạng",
								},
							})}
						/>
						{errors.soDt && (
							<p className="text-red-500">{errors.soDt.message}</p>
						)}
					</div>
					<div className="form-group mb-3">
						<label className="form-label">Họ Tên</label>
						<input
							className="form-control form-name"
							type="text"
							placeholder="Họ tên"
							{...register("hoTen", {
								required: {
									value: true,
									message: "Họ tên không được để trống",
								},
							})}
						/>
						{errors.hoTen && (
							<p className="text-red-500">{errors.hoTen.message}</p>
						)}
					</div>

				</div>

				<div className="add-user-btn mt-3">
					<button className="update-btn">CẬP NHẬT</button>
				</div>
			</form>
		</div>
	);
};

export default UserInfo;
