function NhanVien(
  _taiKhoan,
  _tenNV,
  _email,
  _matKhau,
  _ngayLam,
  _luongCB,
  _chucVu,
  _gioLam
) {
  this.taikhoan = _taiKhoan;
  this.tenNV = _tenNV;
  this.email = _email;
  this.matKhau = _matKhau;
  this.ngLam = _ngayLam;
  this.luongCB = _luongCB;
  this.chucVu = _chucVu;
  this.gioLam = _gioLam;
  this.luong = 0;
  this.xepLoai = "";
  this.tinhLuong = function () {
    if (this.chucVu == "Sếp") this.luong = this.luongCB * 3;
    else if (this.chucVu == "Trưởng Phòng") this.luong = this.luongCB * 2;
    else if (this.chucVu == "Nhân Viên") this.luong = this.luongCB;
  };
  this.xepLoaiNv = function () {
    if (this.gioLam >= 192) this.xepLoai = "Xuất sắc";
    else if (this.gioLam >= 176) this.xepLoai = "Giỏi";
    else if (this.gioLam >= 160) this.xepLoai = "Khá";
    else if (this.gioLam < 160) this.xepLoai = "Trung bình";
  };
}
