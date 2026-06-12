import { db } from "./firebase.js";

console.log("ADMIN FUNCIONANDO");

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

async function cargarDatos() {

  const querySnapshot = await getDocs(collection(db, "respuestas"));

  console.log("Documentos encontrados:", querySnapshot.size);

  const contenedor = document.getElementById("contenedorRespuestas");

  querySnapshot.forEach((doc) => {

    const data = doc.data();

    // Crear tarjeta
    const card = document.createElement("div");
    card.classList.add("card");

    // Título
    let contenido = `
      <h3>${data.nombre || "Sin nombre"}</h3>
    `;

    // Recorrer TODAS las respuestas automáticamente
    for (const clave in data) {

      contenido += `
        <p>
          <strong>${clave}:</strong>
          ${data[clave]}
        </p>
      `;
    }

    card.innerHTML = contenido;

    contenedor.appendChild(card);

  });

}

cargarDatos();

document.getElementById("exportar").addEventListener("click", async () => {

  const querySnapshot = await getDocs(collection(db, "respuestas"));

  let datos = [];

  querySnapshot.forEach((doc) => {
    datos.push(doc.data());
  });

  // Convertir a CSV
  const columnas = [
["nombre","Nombre completo"],
["correo","Correo electrónico"],
["grupo","Grupo"],
["cp","Código Postal"],
["telefono","Teléfono/celular (10 dígitos)"],
["vive","¿Con quién vives?"],
["programa","¿Participaste en algún programa especial?"],
["autorizacion","¿Autorizas compartir tu información para alguna empresa o vacante?"],
["discapacidad","¿Tienes alguna discapacidad?"],
["etnico","¿Perteneces a un grupo étnico?"],
["lengua","¿Hablas alguna lengua?"],
["idioma","¿Hablas otro idioma diferente al español?"],
["negocio","¿Has emprendido algún negocio?"],
["continuar estudios","¿Al egresar del bachillerato continuarás con tus estudios?"],
["examen","¿Aprobaste el examen de admisión?"],
["institucion entrar","¿A qué institución deseas entrar?"],

["frecuencia","¿Con qué frecuencia usas los conocimientos y habilidades adquiridos en el bachillerato?"],
["conocimientos-tecnicos","¿Qué conocimientos técnicos consideras que te hicieron falta durante tu bachillerato?"],
["conocimientos_falta","¿Qué habilidades consideras que te hicieron falta durante tu bachillerato?"],
["conocimientos_dedicando","¿Actividad a la que te estás dedicando?"],

["institucion","Nombre de la institución donde estudias actualmente"],
["ubicacion de la institucion","Ubicación de la institución"],
["tipo","Tipo de institución"],
["carrera","Nombre de la carrera"],
["afin","¿La carrera es afín a la estudiada en el bachillerato?"],

["empresa","Nombre de la empresa"],
["giro","Giro de la empresa"],
["puesto","Puesto o actividad principal"],
["relacion","¿Tiene relación con la carrera estudiada?"],
["ingreso","Ingreso mensual aproximado"],
["razon","Causa por la que no estudias o trabajas"],
["otra_razon","Otra razón"],
["comentarios","Comentarios y sugerencias"]
];

let csv = columnas.map(col => `"${col[1]}"`).join(",") + "\n";

  datos.forEach(obj => {

   let fila = columnas.map(col => {
return `"${obj[col[0]] || ""}"`;
});


    csv += fila.join(",") + "\n";

  });

  // Descargar archivo
  const blob = new Blob(
  ["\uFEFF" + csv],
  { type: "text/csv;charset=utf-8;" }
);
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;
  a.download = "respuestas.csv";

  a.click();

});
