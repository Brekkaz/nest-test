import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { ProtobufService } from './protobuf/protobuf.service';
import { Topic } from './share/enum/topic.enum';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('kafka')
    private readonly clientKafka: ClientProxy,
    private readonly protoService: ProtobufService
  ) { }

  @Get()
  public getHello() {
    const msg = this.protoService.generateProto('UserSockets', {
      uuid: 'qwerty',
      sockets: ['s1', 's2']
    });
    return this.clientKafka.emit(Topic.USER_CONNECTED, msg);
  }

  @MessagePattern(Topic.USER_CONNECTED)
  public test(@Payload() payload: any) {
    const msg = this.protoService.decompressProto('UserSockets', payload);
    Logger.log(msg, AppController.name);
  }
}
