function formatNumberInput(element){
    element.value = element.value.replace(/,/g, '');
    const value = parseFloat(element.value);
    if (!isNaN(value)){
        element.value = value.toLocaleString('en-US');
    }
}



document.getElementById('jumlahPokok').addEventListener('input', function(){
    formatNumberInput(this);
});
document.getElementById('sukuBunga').addEventListener('input', function(){
    formatNumberInput(this);
});
document.getElementById('waktu').addEventListener('input', function(){
    formatNumberInput(this);
});



function hitungBunga() {
    // Ambil input dari form
    const jumlahPokok = parseFloat(document.getElementById('jumlahPokok').value.replace(/,/g,''));
    const sukuBunga = parseFloat(document.getElementById('sukuBunga').value.replace(/,/g,'')) / 100;
    const waktu = parseInt(document.getElementById('waktu').value.replace(/,/g,''));
    const jenisPilihan = document.getElementById('jenisPilihan').value;

    const hasilPerhitungan = document.getElementById('hasilPerhitungan');
    hasilPerhitungan.innerHTML = ''; // Bersihkan tabel sebelum menampilkan hasil baru

    
    // tunggal
    if (jenisPilihan === 'tunggal') {
        let saldoAwal = jumlahPokok;
        for (let bulan = 1; bulan <= waktu; bulan++) {
            const bunga = saldoAwal * sukuBunga;
            const saldoAkhir = saldoAwal + bunga;

            // Masukkan hasilnya ke dalam tabel
            const row = document.createElement('tr');
            row.innerHTML = `<td>${bulan}</td>
                             <td>${bunga.toLocaleString('en-US')}</td>
                             <td>${saldoAkhir.toLocaleString('en-US')}</td>`;
            hasilPerhitungan.appendChild(row);
        }
    }

    // majemuk

    else if(jenisPilihan === 'majemuk'){
        let saldo = jumlahPokok;
        for (let bulan = 1; bulan <= waktu; bulan++){
            const bunga = saldo * sukuBunga;
            saldo += bunga;

            const row = document.createElement('tr');
            row.innerHTML = `<td>${bulan}</td>
                             <td>${bunga.toLocaleString('en-US')}</td>
                             <td>${saldo.toLocaleString('en-US')}</td>`;
            hasilPerhitungan.appendChild(row);

            
        }
    }

    else if(jenisPilihan === 'anunitas'){

        document.getElementById('jumlahAngsuran').style.display = 'table-cell'
        document.getElementById('bungaPokok').style.display = 'table-cell'

        let saldoTersisa = jumlahPokok;

        const anunitas = jumlahPokok * (sukuBunga / (1 - Math.pow(1 + sukuBunga, -waktu)));

        for(let bulan= 1; bulan <= waktu; bulan++){
            // menghitung bunga bulan ini
            const bunga = saldoTersisa * sukuBunga;

            const pokok = anunitas - bunga;

            saldoTersisa -= pokok;

            const row = document.createElement('tr');
            row.innerHTML = `<td>${bulan}</td>
                             <td>${bunga.toLocaleString('en-US')}</td>
                             <td>${pokok.toLocaleString('en-US')}</td>
                             <td>${anunitas.toFixed(2)}</td>
                             <td>${saldoTersisa.toFixed(2)}</td>`;
                            
            hasilPerhitungan.appendChild(row);



            
        }
    }
}
