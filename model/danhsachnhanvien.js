function DanhSachNhanVien() {
  this.arr = [];
  this.find = function (taikhoan) {
    for (let i = 0; i < this.arr.length; i++) {
      if (this.arr[i].taikhoan === taikhoan) return i;
    }
    return -1;
  };
  this.add = function (nhanVien) {
    this.arr.push(nhanVien);
  };
  this.remove = function (taikhoan) {
    let index = this.find(taikhoan);
    if (index !== -1) this.arr.splice(index, 1);
  };
  this.get = function (taikhoan) {
    let index = this.find(taikhoan);
    if (index !== -1) return this.arr[index];
    return null;
  };
  this.update = function (nhanVien) {
    let index = this.find(nhanVien.taikhoan);
    if (index !== -1) this.arr[index] = nhanVien;
  };
  this.search = function (key) {
    let result = [];
    for (let i = 0; i < this.arr.length; i++) {
      if (this.arr[i].xepLoai.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        result.push(this.arr[i]);
      }
    }
    return result;
  };
}
