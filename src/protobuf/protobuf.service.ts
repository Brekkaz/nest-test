import { Injectable, OnModuleInit, Logger } from '@nestjs/common';

import { join } from 'path';
import * as protobufjs from 'protobufjs';

@Injectable()
export class ProtobufService implements OnModuleInit {
  /**
   * Logger instance
   */
  private readonly logger = new Logger(ProtobufService.name);

  /**
   * Root is a config to use root config to proto instance
   */
  private root;

  /**
   * Proto is a instance to configure proto generate instance
   */
  private Proto;

  /**
   * Init and bind onModuleInit to configure .proto file
   * @params null with basic module config to constructor
   */
  constructor() {
    this.onModuleInit = this.onModuleInit.bind(this);
  }

  /**
   * Module called in creation of module
   * @param null not recibe any param
   * @returns null nor return any response
   * This module init with the module is mount
   */
  async onModuleInit() {
    try {
      this.root = await protobufjs.load(
        join(__dirname, '/proto-files-bifrost/protoChat.proto'),
      );
    } catch (error) {
      this.logger.error({
        Title: 'Error init config of protobuf to message',
        Error: `[${error.name}]: ${error.message}`,
      });
    }
  }

  /**
   * Function to generate buffer of data
   * @param payload json or object to send and generate buffer
   * @returns Buffer from data of payload
   */
  generateProto(protoName: string, payload: any): Buffer {
    try {
      const Proto = this.root.lookupType(`protoChat.${protoName}`);

      const errorVerify = Proto.verify(payload);
      if (errorVerify) throw Error(errorVerify);

      const message = Proto.create(payload);
      const bufferTemp = Proto.encode(message).finish();

      return bufferTemp;
    } catch (error) {
      this.logger.error({
        Title: 'Error generate protobuf from message',
        Error: `[${error.name}]: ${error.message}`,
      });
      return null;
    }
  }

  /**
   * Function to generate buffer of data
   * @param payload json or object to send and generate buffer
   * @returns Buffer from data of payload
   */
  decompressProto(protoName: string, buffer): any {
    try {
      const messageBufferAscii = Buffer.from(buffer, 'ascii');
      const Proto = this.root.lookupType(`protoChat.${protoName}`);

      const debuf = Proto.decode(messageBufferAscii);
      const payload: any = debuf.toJSON();
      return payload;
    } catch (error) {
      this.logger.error({
        Title: 'Error generate protobuf from message',
        Error: `[${error.name}]: ${error.message}`,
      });
      return null;
    }
  }
}
