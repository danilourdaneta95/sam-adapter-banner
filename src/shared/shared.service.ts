export class SharedService {
  static createSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
  static cleanRut(x: string): string {
    return x?.split('.').join('').split('-').join('');
  }
  static formatRut(rut: string): string {
    if (!rut) return undefined;
    return `${rut.slice(0, rut.length - 1)}-${rut.slice(rut.length - 1)}`;
  }

  static formatChileanRUT(rut: string): string {
    // Remove all characters except digits and k/K
    rut = rut.replace(/[^\dkK]/g, '');

    let mainNumber = rut.slice(0, -1);
    const verifierDigit = rut.slice(-1).toUpperCase();

    // Add a dot every 3 characters in the main number, except for the last 3 characters
    mainNumber = mainNumber.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return `${mainNumber}-${verifierDigit}`;
  }

  static getLastDigitOfRut(rutNumbers: number): string {
    let M = 0,
      S = 1;
    for (; rutNumbers; rutNumbers = Math.floor(rutNumbers / 10))
      S = (S + (rutNumbers % 10) * (9 - (M++ % 6))) % 11;
    const lastDigitValid = (S ? S - 1 : 'K').toString();
    return lastDigitValid;
  }

  static formatRutWithDots(rut: string, withDots = true): string {
    /**
     * Format a RUT to a valid format.
     * @param rut  RUT string
     * @param withDots  true if RUT should be formatted with dots, false otherwise.
     * @return {string} RUT formatted.
     */
    rut = this.cleanRut(rut);
    let rutFormatted;
    if (withDots) {
      rutFormatted = rut.slice(-4, -1) + '-' + rut.substring(rut.length - 1);
      for (let i = 4; i < rut.length; i += 3) {
        rutFormatted = rut.slice(-3 - i, -i) + '.' + rutFormatted;
      }
    } else {
      rutFormatted = this.cleanRut(rut);
    }

    return rutFormatted;
  }
  static cleanPhoneNumber(phone: string): string {
    return phone?.replace(/[^0-9]/g, '').slice(2);
  }
}
