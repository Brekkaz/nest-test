import { Test, TestingModule } from '@nestjs/testing';
import { ProtobufService } from './protobuf.service';

describe('ProtobufService', () => {
  let service: ProtobufService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProtobufService],
    }).compile();

    service = module.get<ProtobufService>(ProtobufService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
