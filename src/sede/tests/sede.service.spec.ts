import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { Sede } from '../schemas/sede.schema';
import { SedeService } from '../sede.service';
import { getModelToken } from '@nestjs/mongoose';

describe('SedeService', () => {
    let service: SedeService;
    let model: Model<Sede>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SedeService,
                {
                    provide: getModelToken('Sede'),
                    useValue: {
                        create: jest.fn(),
                        findOne: jest.fn(),
                    },
                },
                {
                    provide: getModelToken('SedeBanner'),
                    useValue: {
                        create: jest.fn(),
                        findOne: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<SedeService>(SedeService);
        model = module.get<Model<Sede>>(getModelToken('Sede'));
    });

    it('should create a program catalog', async () => {
        const expectedResult: Sede = {
            id: 'asdasd',
            name: 'Sede Economía', 
            code: 'SECO'
        };
        const mockSedeService = (data): Promise<Sede> => {
            expect(data.name).toBe('Sede Economía');
            return Promise.resolve({
                id: 'asdasd',
                name: 'Sede Economía',
                code: 'SECO'
            });
        };
        jest.spyOn(service, 'createSede').mockImplementation(mockSedeService);

        const result = await service.createSede(expectedResult);

        expect(result).toEqual(expectedResult);
    });
});