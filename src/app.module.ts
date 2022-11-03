import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProtobufModule } from './protobuf/protobuf.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'kafka',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'MS-MICRO',
            brokers: ['localhost:9092']
          },
        }
      },
      {
        name: 'HERO_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'hero',
          protoPath: join(__dirname, 'protobuf/proto-files-bifrost/hero.proto'),
        },
      },
    ]),
    ProtobufModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
