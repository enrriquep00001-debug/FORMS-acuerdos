/* ===== backend_repository.gs ===== */

function obtenerRegistros() {
  const sheet = SpreadsheetApp
    .openById(CONFIG.SHEET_ID)
    .getSheetByName(CONFIG.SHEETS.ACUERDOS);

  if (!sheet) throw new Error("No existe la hoja ACUERDOS");

  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return [];

  const data = sheet.getRange(2, 1, lastRow - 1, 18).getValues();

  return data.map(function(row) {
    return row.map(function(cell) {
      if (cell instanceof Date) {
        return Utilities.formatDate(
          cell,
          Session.getScriptTimeZone(),
          "dd/MM/yyyy"
        );
      }
      return String(cell || "");
    });
  });
}

const AcuerdoRepository = {
  guardar(acuerdo) {
    const sheet = SpreadsheetApp
      .openById(CONFIG.SHEET_ID)
      .getSheetByName(CONFIG.SHEETS.ACUERDOS);

    sheet.appendRow([
      acuerdo.idRegistro,
      acuerdo.tipoRegistro  || "",
      acuerdo.tema          || "",
      acuerdo.descripcion   || "",
      acuerdo.origen        || "",
      acuerdo.responsable   || "",
      acuerdo.areaResponsable || "",
      acuerdo.dependencias  || "",
      acuerdo.fechaAcuerdo  || "",
      acuerdo.fechaCompromiso || "",
      acuerdo.estatus       || "",
      acuerdo.porcentaje    || "",
      acuerdo.semaforo      || "",
      acuerdo.prioridad     || "",
      acuerdo.riesgos       || "",
      acuerdo.evidencia     || "",
      new Date(),
      acuerdo.observaciones || ""
    ]);

    return true;
  }
};