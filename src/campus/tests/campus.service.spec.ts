import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { CampusService } from '../campus.service';
import { getModelToken } from '@nestjs/mongoose';
import { Campus } from '../schemas/campus.schema';
import { SedeService } from '../../sede/sede.service';

describe('CampusService', () => {
    let service: CampusService;
    let model: Model<Campus>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CampusService,
                {
                    provide: getModelToken('Campus'),
                    useValue: {
                        create: jest.fn(),
                        findOne: jest.fn(),
                    },
                },
                {
                    provide: getModelToken('CampusBanner'),
                    useValue: {
                        create: jest.fn(),
                        findOne: jest.fn(),
                    },
                },
                {
                    provide: SedeService,
                    useValue: {
                        findOne: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<CampusService>(CampusService);
        model = module.get<Model<Campus>>(getModelToken('Campus'));
    });

    it('should create a program catalog', async () => {
        const expectedResult: Campus = {
            id: 'asdasd',
            name: 'Campus Economía',
            code: 'CECO',
            sede: 'UNLa',
            demreCode: "PENDIENTE"
        };
        const mockCampusService = (data): Promise<Campus> => {
            expect(data.name).toBe('Campus Economía');
            expect(data.code).toBe('CECO');
            return Promise.resolve({
                id: 'asdasd',
                name: 'Campus Economía',
                code: 'CECO',
                sede: 'UNLa',
                demreCode: "PENDIENTE"
            });
        };
        jest.spyOn(service, 'createCampus').mockImplementation(mockCampusService);

        const result = await service.createCampus(expectedResult);

        expect(result).toEqual(expectedResult);
    });
});