export default function benefitTypeMapper(data: string) {
  if (
    data.toUpperCase().includes('INTERNAS') ||
    data.toUpperCase().includes('INTERNO')
  ) {
    return { banner: 'BI', sam: 'Interno' };
  } else if (
    data.toUpperCase().includes('EXTERNAS') ||
    data.toUpperCase().includes('EXTERNO') ||
    data.toUpperCase().includes('CAE')
  ) {
    return { banner: 'BX', sam: 'Externo' };
  } else if (data.toUpperCase().includes('DESCUENTOS')) {
    return { banner: 'BD', sam: 'Descuento' };
  }
}
