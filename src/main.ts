import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      subscribe: {
        fromBeginning: true,
      },
      consumer: {
        groupId: 'MS-MICRO',
      },
      client: {
        clientId: 'MS-MICRO',
        brokers: ['localhost:9092'],
      },
    },
  } as MicroserviceOptions);

  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: 'hero',
      protoPath: join(__dirname, 'protobuf/proto-files-bifrost/hero.proto'),
    },
  } as MicroserviceOptions);

  app.startAllMicroservices();

  await app.listen(3000);
}
bootstrap();
