const matriculaArancelTypes = {
  MATRICULA: 'Matrícula',
  ARANCEL: 'Arancel',
};

export default function matriculaArancelMapper(data) {
  /* sanitize special characters and remove spaces from data */
  const cleanedData = data
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/\s/g, '');
  if (
    cleanedData.toUpperCase().includes('MATRICULA') ||
    cleanedData.toUpperCase().includes('MAT1') ||
    cleanedData.toUpperCase().includes('MAT2') ||
    cleanedData.toUpperCase().includes('EMAT') ||
    cleanedData.toUpperCase().includes('MAT4')
  ) {
    return { sam: matriculaArancelTypes.MATRICULA, banner: data };
  } else if (
    cleanedData.toUpperCase().includes('ARANCEL') ||
    cleanedData.toUpperCase().includes('ARA1') ||
    cleanedData.toUpperCase().includes('ARA2') ||
    cleanedData.toUpperCase().includes('EARA') ||
    cleanedData.toUpperCase().includes('ARAN') ||
    cleanedData.toUpperCase().includes('ARA4')
  ) {
    return { sam: matriculaArancelTypes.ARANCEL, banner: data };
  }
}
