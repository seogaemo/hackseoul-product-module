import { S3_PACKAGE_NAME } from "@shared/generated/s3.proto";
import { grpcClientOptions } from "@shared/options/s3.option";

import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { PrismaModule } from "src/common/modules";

import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: S3_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: grpcClientOptions.options,
      },
    ]),
    PrismaModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
