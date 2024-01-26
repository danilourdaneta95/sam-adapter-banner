import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { RetentionsService } from './../retentions.service';
import { RetentionDto } from '../dto/retention.dto';
import { BannerResponse } from '../../types/banner-response.type';

describe('RetentionsService', () => {
  let service: RetentionsService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RetentionsService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RetentionsService>(RetentionsService);
    httpService = module.get<HttpService>(HttpService);
  });

  describe('getAll', () => {
    it('should return all retentions', async () => {
      const data: BannerResponse<RetentionDto[]> = {
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
        // Define your expected retentions object
      };

      const mockGetMethod = (url): any => {
        expect(url).toEqual('/banner/mestros/retenciones');
        return new Observable((subs) => {
          subs.next({
            data: {
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
            },
          });
          subs.complete();
        });
      };

      jest.spyOn(httpService, 'get').mockImplementation(mockGetMethod);

      const result = await service.getAll();

      expect(result.statusCode).toBe(200);
      expect(result.body).toEqual(data.body);
    });

    it('should throw an error if the request fails', async () => {
      const mockGetMethod = (url): any => {
        expect(url).toEqual('/banner/mestros/retenciones');
        return new Observable((subs) => {
          subs.next({
            data: {
              statusCode: 400,
              message: 'error',
            },
          });
          subs.complete();
        });
      };
      jest.spyOn(httpService, 'get').mockImplementation(mockGetMethod);
      try {
        await service.getAll();
      } catch (err) {
        expect(err.message).toEqual('error');
      }
    });
  });
});
