export default {
  VALID_ENDORSEMENT_BANNER() {
    return {
      person: {
        rut: '12345',
        first_name: 'Pato',
        last_name: 'Cortez',
        type: { code: 'PNAT' },
        birth_date: '20/01/1970',
        legacy: { code: 'P' },
        gender: 'M',
        citizen: { code: 'CH' },
      },
      phones: [
        {
          phone_number: '56912345678',
          phone_area: '56',
          type: { code: 'MA' },
          address_type: { code: 'PR' },
        },
      ],
      addresses: [
        {
          type: { code: 'PR' },
          address: 'Calle 123',
          state: { code: '13' },
          zip: '1234567',
          county: { code: '13302' },
          nation: { code: 'CL' },
        },
      ],
      emails: [
        { email_address: 'example@example.com', type: { code: 'CSOS' } },
      ],
      header: { data_origin: 'SAM-MATICULADOR', user_id: 'uss-dev' },
    };
  },
  ENDORSEMENT_BANNER_RESPONSE(code: number) {
    return {
      data: {
        statusCode: code,
        body: {
          person: {
            pidm: '123456',
          },
        },
      },
    };
  },
};
