import { Test, TestingModule } from '@nestjs/testing';
import { RetentionsController } from '../retentions.controller';
import { RetentionsService } from '../retentions.service';

describe('RetentionsController', () => {
  let retentionsController: RetentionsController;
  let retentionsService: RetentionsService;
  let mockRetentionsService;

  beforeEach(async () => {
    mockRetentionsService = {
      getAll: () => {},
    };
    const retentions: TestingModule = await Test.createTestingModule({
      controllers: [RetentionsController],
      providers: [
        { provide: RetentionsService, useValue: mockRetentionsService },
      ],
    }).compile();

    retentionsController = retentions.get<RetentionsController>(RetentionsController);
    retentionsService = retentions.get<RetentionsService>(RetentionsService);
  });

  describe('get', () => {
    it('should return all retentions', async () => {
      const retentions = {
        statusCode: 200,
        body: [
          {
            code: '001',
            descripction: 'Retention 1',
            reg_hold_ind: 'Y',
            trans_hold_ind: 'N',
            grad_hold_ind: 'N',
            grade_hold_ind: 'N',
            ar_hold_ind: 'N',
            env_hold_ind: 'N',
            vr_msg_no: '001',
            disp_web_ind: 'Y',
            application_hold_ind: 'N',
            compliance_hold_ind: 'N',
            user_id: 'user1',
            data_origin: 'origin1',
            activity_date: '2022-01-01',
          },
          {
            code: '002',
            descripction: 'Retention 2',
            reg_hold_ind: 'N',
            trans_hold_ind: 'Y',
            grad_hold_ind: 'N',
            grade_hold_ind: 'N',
            ar_hold_ind: 'N',
            env_hold_ind: 'N',
            vr_msg_no: '002',
            disp_web_ind: 'Y',
            application_hold_ind: 'N',
            compliance_hold_ind: 'N',
            user_id: 'user2',
            data_origin: 'origin2',
            activity_date: '2022-01-02',
          },
        ],
      }; // Define the expected retentions object

      jest.spyOn(retentionsService, 'getAll').mockResolvedValue(retentions);

      const result = await retentionsController.get();

      expect(result).toBe(retentions.body);
    });

    it('should throw BadRequestException if service throws BadRequestException', async () => {
      const retentions = {
        statusCode: 400,
        message: 'Bad Request.',
      }; // Define the expected retentions object

      jest.spyOn(retentionsService, 'getAll').mockResolvedValue(retentions);
      try {
        await retentionsController.get();
      } catch (error) {
        expect(error.message).toBe(retentions.message);
      }
    });
  });
});
