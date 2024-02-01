document.getElementById('formContacto').addEventListener('submit', async function(evento) {

    const nombre = document.getElementById('FormNameInput').value;
    const email = document.getElementById('FormEmailInput').value;
    const telefono = document.getElementById('FormPhoneInput').value;
    const msj = document.getElementById('FormMsjInput').value;
    evento.preventDefault();

    if(nombre === "" || email === "" || telefono === "" || msj === ""){
      Swal.fire({
        title:'Campos Vacios',
        text:'Hay campos vacios complete todos los campos antes de continuar',
        icon:'error'
      })
    } else {
      console.log(telefono);
      const datos = {
        nombre: nombre,
        email: email,
        telefono: telefono,
        msj: msj
      };
      console.log('holaaaa');
      try {
        const res = await fetch('http://localhost:3000/contacto', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(datos)
        });
        console.log(res.status);
        if (res.ok) {
          Swal.fire({
            title: 'Mensaje enviado',
            text: 'El ususario se ha creado exitosamente.',
            icon: 'success',
            showConfirmButton: false,
            timer: 1000
          })
        setTimeout(() => {
            window.location.href = '/';
        }, 1000);
        
        } else {
          // La solicitud falló, manejar el error mostrando el mensaje del servidor
          const responseJson = await res.json();
          Swal.fire({
            title:'Error en el registro',
            text:'El Correo que usted esta intentando registrar ya se encuantra registrado, pruebe con otro mail',
            icon:'error'
          })
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  });
  