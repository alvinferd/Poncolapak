const User = {
    nama: 'John Doe',
    tanggal_lahir: '2000-01-01',
    jenis_kelamin: 'Laki-Laki',
    email: 'poncolapak@gmail.com',
    no_hp:  '08123456789',
    photo: "/images/photo user.png",
    alamat_tersimpan: [
        {
            id: 1,
            nama_penerima: 'John Doe',
            no_hp: '08123456789',
            email: 'johndoe@gmail.com',
            alamat: ' Jl. Veteran, Kec. Bekasi Sel., Kota Bks, Jawa Barat, 17141 [Tokopedia Note: No. 86 RT03, RW02] Jl. Veteran, Kec. Bekasi Sel., Kota Bks, Jawa Barat, 17141 [Tokopedia Note: No. 86 RT03, RW02]',
            kota_kecamatan: 'Jawa Barat, Kota Bekasi, Bekasi Selatan',
            kodepos: '17141',
            isPrimary: true,
        },
        {
            id: 2,
            nama_penerima: 'John Thor',
            no_hp: '08123456789',
            email: 'johndoe@gmail.com',
            alamat: 'Jl. Veteran, Kec. Bekasi Sel., Kota Bks, Jawa Barat, 17141 [Tokopedia Note: No. 86 RT03, RW02] Jl. Veteran, Kec. Bekasi Sel., Kota Bks, Jawa Barat, 17141 [Tokopedia Note: No. 86 RT03, RW02]',
            kota_kecamatan: 'Jawa Barat, Kota Bekasi, Bekasi Selatan',
            kodepos: '17141',
            isPrimary: false,
        }
    ]
}

export default User;