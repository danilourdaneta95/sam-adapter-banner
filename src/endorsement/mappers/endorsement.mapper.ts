import { SharedService } from '../../shared/shared.service';
import { PersonDto } from '../dto/person.dto';

export default class EndorsementMapper {
  getNationality(nationality: string) {
    return 'EX';
  }

  mapPersonDtoToBannerEndorsement(endorsement: PersonDto) {
    let data;
    if (endorsement.nationality !== 'Chilena') {
      data = {
        international_information: {
          passport_id: SharedService.cleanRut(endorsement.rut),
          natn_code_issue: this.getNationality(endorsement.nationality),
        },
      };
    }
    return {
      rut: SharedService.cleanRut(endorsement.rut),
      first_name: endorsement.name,
      last_name: endorsement.lastname,
      type: {
        code: 'PNAT',
      },
      birth_date: new Date(parseInt(endorsement.birthDate))
        .toLocaleDateString('es-CL')
        .replace(/[-]/g, '/'),
      legacy: { code: endorsement.genre.toUpperCase() === 'MALE' ? 'P' : 'M' },
      gender: endorsement.genre.toUpperCase() === 'MALE' ? 'M' : 'F',
      citizen: { code: endorsement.nationality !== 'Chilena' ? 'EX' : 'CH' },
      ...data,
    };
  }

  getPhones(endorsement: PersonDto) {
    return [
      {
        phone: SharedService.cleanPhoneNumber(endorsement.phone),
        phone_area: '56',
        type: { code: 'MA' },
        address_type: { code: 'PR' },
      },
    ];
  }

  getState(state: string) {
    return '13';
  }

  getCounty(county: string) {
    return '13302';
  }

  getAddresses(endorsement: PersonDto) {
    return [
      {
        type: { code: 'PR' },
        address: endorsement.direccion,
        state: { code: this.getState(endorsement.region) },
        zip: endorsement.postalCode,
        county: { code: this.getCounty(endorsement.comuna) },
        nation: { code: endorsement.nationality !== 'Chilena' ? 'EX' : 'CL' },
      },
    ];
  }

  getEmails(endorsement: PersonDto) {
    return [
      {
        email_address: endorsement.email,
        type: { code: 'CSOS' },
      },
    ];
  }

  toBannerEndorsement(endorsement: PersonDto) {
    let data = {};
    if (
      SharedService.cleanRut(endorsement.selectedBeneficiario) !==
      SharedService.cleanRut(endorsement.rut)
    ) {
      data = {
        estudiante: SharedService.cleanRut(endorsement.selectedBeneficiario),
      };
    }
    const person = this.mapPersonDtoToBannerEndorsement(endorsement);
    const phones = this.getPhones(endorsement);
    const addresses = this.getAddresses(endorsement);
    const emails = this.getEmails(endorsement);
    return {
      ...data,
      person,
      phones,
      addresses,
      emails,
    };
  }
}
