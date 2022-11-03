import quanLyNguoiDungService from "../../../../services/quanLyNguoiDungService";
import useRequest from "../../../../hooks/useRequest";
import { updateUser } from "../../slices/userSlice";
import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import './userList.scss'

const EditUser = () => {
	const { userId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { data: user } = useRequest(() => quanLyNguoiDungService.getUserDetails(userId));

	useEffect(() => {
		reset({
			taiKhoan: user?.taiKhoan,
			matKhau: user?.matKhau,
			email: user?.email,
			soDt: user?.soDT,
			hoTen: user?.hoTen,
			maLoaiNguoiDung: user?.maLoaiNguoiDung,
		});
	}, [user]);

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
			await dispatch(updateUser(values)).unwrap();
			await Swal.fire({
                icon:'success',
                title:'Cập nhật thành công',
            })
			navigate("/admin/userList");
		} catch (error) {
			Swal.fire({
                icon:'error',
                title:'Cập nhật thất bại',
                text:error,
            })
		}
	};

	return (
		<div>
			<h1 className='text-orange-500 mb-5 text-[30px] font-semibold'>Cập Nhật Người Dùng</h1>

			<div className="add-user-info">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div>
						
							<div className="form-group mb-3">
								<label className="form-label">Tài Khoản</label>
								<input
									className="form-control"
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
									<p className="text-danger">{errors.taiKhoan.message}</p>
								)}
							</div>
							<div className="form-group mb-3">
								<label className="form-label">Mật Khẩu</label>
								<input
									className="form-control"
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
									<p className="text-danger">{errors.matKhau.message}</p>
								)}
							</div>
							<div className="form-group mb-3">
								<label className="form-label">Email</label>
								<input
									className="form-control"
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
									<p className="text-danger">{errors.email.message}</p>
								)}
							</div>
						

						
							<div className="form-group mb-3">
								<label className="form-label">Số Điện Thoại</label>
								<input
									className="form-control"
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
									<p className="text-danger">{errors.soDt.message}</p>
								)}
							</div>
							<div className="form-group mb-3">
								<label className="form-label">Họ Tên</label>
								<input
									className="form-control"
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
									<p className="text-danger">{errors.hoTen.message}</p>
								)}
							</div>
							<div className="form-group mb-3">
								<label className="form-label">Mã Loại Người Dùng</label>
								<select
									className="form-select"
									{...register("maLoaiNguoiDung")}
								>
									<option value="KhachHang">Khách Hàng</option>
									<option value="QuanTri">Quản Trị</option>
								</select>
							</div>
						
					</div>

					<div className="add-user-btn mt-5">
						<button className="update-info-btn">Cập Nhật</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditUser;
