let dsNhanVien = new DanhSachNhanVien();
let validation = new Validation();
getLocalStorage();
function getEle(id) {
  return document.getElementById(id);
}
function getInfoStaff() {
  let _taikhoan = getEle("tknv").value;
  let _tenNV = getEle("name").value;
  let _email = getEle("email").value;
  let _matKhau = getEle("password").value;
  let _ngayLam = getEle("datepicker").value;
  let _luongCB = getEle("luongCB").value;
  let _chucVu = getEle("chucvu").value;
  let _gioLam = getEle("gioLam").value;
  let isValid = true;
  isValid &=
    validation.kiemTraRong(
      _taikhoan,
      "tbTKNV",
      "Tài khoản không được để trống"
    ) &&
    validation.kiemTraSo(_taikhoan, "tbTKNV", "Tài khoản phải là số") &&
    validation.kiemtraTrung(
      _taikhoan,
      "tbTKNV",
      "Tài khoản đã tồn tại",
      dsNhanVien.arr
    );
  isValid &=
    validation.kiemTraRong(
      _tenNV,
      "tbTen",
      "Tên nhân viên không được để trống"
    ) &&
    validation.kiemTraChuoiKiTu(_tenNV, "tbTen", "Tên nhân viên phải là chữ");
  isValid &=
    validation.kiemTraRong(_email, "tbEmail", "Email không được để trống") &&
    validation.kiemTraEmail(_email, "tbEmail", "Email không đúng định dạng");
  isValid &=
    validation.kiemTraRong(
      _matKhau,
      "tbMatKhau",
      "Mật khẩu không được để trống"
    ) &&
    validation.kiemTraDoDaiKiTu(
      _matKhau,
      "tbMatKhau",
      "Mật khẩu phải 6-10 ký tự",
      6,
      10
    ) &&
    validation.kiemTraMk(
      _matKhau,
      "tbMatKhau",
      "Mật khẩu phải chứa ký tự hoa, thường, số và ký tự đặc biệt"
    );
  isValid &=
    validation.kiemTraRong(_ngayLam, "tbNgay", "Vui lòng chọn ngày làm việc") &&
    validation.kiemTraNgay(_ngayLam, "tbNgay", "Ngày làm việc không hợp lệ");
  isValid &=
    validation.kiemTraRong(
      _luongCB,
      "tbLuongCB",
      "Vui lòng nhập lương cơ bản"
    ) &&
    validation.kiemTraMinMax(
      _luongCB,
      "tbLuongCB",
      "Lương cơ bản từ 1000000 đến 20000000",
      1000000,
      20000000
    );
  isValid &= validation.kiemTraChucVu(
    _chucVu,
    "tbChucVu",
    "Vui lòng chọn chức vụ"
  );
  isValid &=
    validation.kiemTraRong(_gioLam, "tbGiolam", "Vui lòng nhập giờ làm") &&
    validation.kiemTraMinMax(
      _gioLam,
      "tbGiolam",
      "Giờ làm phải 80-200",
      80,
      200
    );
  if (isValid) {
    let nhanVien = new NhanVien(
      _taikhoan,
      _tenNV,
      _email,
      _matKhau,
      _ngayLam,
      _luongCB,
      _chucVu,
      _gioLam
    );
    nhanVien.tinhLuong();
    nhanVien.xepLoaiNv();
    return nhanVien;
  }
  return null;
}
function renderTable(arr) {
  let tbd = getEle("tableDanhSach");
  let content = "";
  for (let i = 0; i < arr.length; i++) {
    let nhanVien = arr[i];
    content += `<tr>
        <td>${nhanVien.taikhoan}</td>
        <td>${nhanVien.tenNV}</td>
        <td>${nhanVien.email}</td>
        <td>${nhanVien.ngLam}</td>
        <td>${nhanVien.chucVu}</td>
        <td>${nhanVien.luong}</td>
        <td>${nhanVien.xepLoai}</td>
        <td><button class="btn btn-danger" onclick="removeStaff('${nhanVien.taikhoan}')">Xóa</button>
        <button class="btn btn-warning"  data-toggle="modal"
        data-target="#myModal" onclick="editStaff('${nhanVien.taikhoan}')">Sửa</button></td>
        </td>
        </tr>`;
  }
  return (tbd.innerHTML = content);
}
// Nhan nut them nhan vien tra ve gia tri null de nhap lieu
getEle("btnThem").addEventListener("click", function () {
  getEle("tknv").value = "";
  getEle("name").value = "";
  getEle("email").value = "";
  getEle("password").value = "";
  getEle("datepicker").value = "";
  getEle("luongCB").value = "";
  getEle("chucvu").value = "Chọn chức vụ";
  getEle("gioLam").value = "";
  getEle("btnThemNV").style.display = "block";
  getEle("btnCapNhat").style.display = "none";
});
getEle("btnThemNV").addEventListener("click", function () {
  let nhanVien = getInfoStaff();
  if (nhanVien) {
    dsNhanVien.add(nhanVien);
    renderTable(dsNhanVien.arr);
    setLocalStorage();
  }
});
function removeStaff(taikhoan) {
  dsNhanVien.remove(taikhoan);
  renderTable(dsNhanVien.arr);
  setLocalStorage();
}
function editStaff(taikhoan) {
  let nhanVien = dsNhanVien.get(taikhoan);
  getEle("tknv").value = nhanVien.taikhoan;
  getEle("tknv").disabled = true;
  getEle("name").value = nhanVien.tenNV;
  getEle("email").value = nhanVien.email;
  getEle("password").value = nhanVien.matKhau;
  getEle("datepicker").value = nhanVien.ngLam;
  getEle("luongCB").value = nhanVien.luongCB;
  getEle("chucvu").value = nhanVien.chucVu;
  getEle("gioLam").value = nhanVien.gioLam;
  getEle("btnThemNV").style.display = "none";
  getEle("btnCapNhat").style.display = "block";
}
getEle("btnCapNhat").addEventListener("click", function () {
  let nhanVien = getInfoStaff();
  if (nhanVien) {
    dsNhanVien.update(nhanVien);
    renderTable(dsNhanVien.arr);
    setLocalStorage();
  }
});
getEle("searchName").addEventListener("keyup", function () {
  let keyword = getEle("searchName").value;
  let mangTimKiem = dsNhanVien.search(keyword);
  renderTable(mangTimKiem);
});
function setLocalStorage() {
  // Chuyen dataString tu json sang string
  let dataString = JSON.stringify(dsNhanVien.arr);
  // Luu dataString vao localStorage
  localStorage.setItem("dsnv", dataString);
}
function getLocalStorage() {
  // Lay dataString tu localStorage
  let dataString = localStorage.getItem("dsnv");
  if (dataString) {
    // Chuyen dataString tu string sang json
    let dataJson = JSON.parse(dataString);
    // Gan dataJson vao dsNhanVien.arr
    dsNhanVien.arr = dataJson;
    // Render lai bang
    renderTable(dsNhanVien.arr);
  }
}
