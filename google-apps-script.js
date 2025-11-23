// Google Apps Script para recibir datos del formulario de confirmaciones
// Este código debe ir en: Extensiones → Apps Script de tu Google Sheet

function doPost(e) {
  try {
    // Obtener la hoja de cálculo activa
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parsear los datos recibidos
    var data = JSON.parse(e.postData.contents);
    
    // Preparar la fila de datos
    var row = [
      new Date(), // Fecha y hora
      data.guests || '', // Número de invitados
      data.name1 || '', // Invitado 1 - Nombre
      data.lastname1 || '', // Invitado 1 - Apellido
      data.name2 || '', // Invitado 2 - Nombre
      data.lastname2 || '', // Invitado 2 - Apellido
      data.name3 || '', // Invitado 3 - Nombre
      data.lastname3 || '', // Invitado 3 - Apellido
      data.name4 || '', // Invitado 4 - Nombre
      data.lastname4 || '', // Invitado 4 - Apellido
      data.name5 || '', // Invitado 5 - Nombre
      data.lastname5 || '', // Invitado 5 - Apellido
      data.name6 || '', // Invitado 6 - Nombre
      data.lastname6 || '', // Invitado 6 - Apellido
      data.name7 || '', // Invitado 7 - Nombre
      data.lastname7 || '', // Invitado 7 - Apellido
      data.name8 || '', // Invitado 8 - Nombre
      data.lastname8 || '', // Invitado 8 - Apellido
      data.attendance || '', // ¿Confirma asistencia?
      data.dietary || '', // Requerimientos alimenticios
      data.song || '' // Canción solicitada
    ];
    
    // Agregar la fila a la hoja
    sheet.appendRow(row);
    
    // Enviar email de notificación
    var emailBody = '¡Nueva confirmación de asistencia!\n\n';
    emailBody += 'Número de invitados: ' + data.guests + '\n\n';
    
    for (var i = 1; i <= parseInt(data.guests); i++) {
      if (data['name' + i]) {
        emailBody += 'Invitado ' + i + ': ' + data['name' + i] + ' ' + data['lastname' + i] + '\n';
      }
    }
    
    emailBody += '\nConfirma asistencia: ' + (data.attendance === 'yes' ? 'Sí' : 'No') + '\n';
    if (data.dietary) {
      emailBody += 'Requerimientos alimenticios: ' + data.dietary + '\n';
    }
    if (data.song) {
      emailBody += 'Canción solicitada: ' + data.song + '\n';
    }
    
    // Enviar email al organizador
    MailApp.sendEmail({
      to: 'estudionomade2025@gmail.com',
      subject: 'Nueva confirmación XV de Pili',
      body: emailBody
    });
    
    // Responder con éxito
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'success',
      'message': '¡Confirmación registrada exitosamente!'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Responder con error
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Función de prueba (opcional)
function testScript() {
  var testData = {
    guests: '2',
    name1: 'Juan',
    lastname1: 'Pérez',
    name2: 'María',
    lastname2: 'González',
    attendance: 'yes',
    dietary: 'Vegetariano',
    song: 'La Bamba'
  };
  
  var e = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  Logger.log(doPost(e));
}
