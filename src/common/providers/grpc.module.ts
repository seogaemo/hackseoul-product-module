import { grpcClientOptions } from "@shared/options/product.option";
import { GrpcReflectionModule } from "nestjs-grpc-reflection";

import { Module } from "@nestjs/common";

@Module({
  imports: [GrpcReflectionModule.register(grpcClientOptions)],
})
export class GrpcModule {}
