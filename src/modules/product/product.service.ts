import { status } from "@grpc/grpc-js";
import {
  CreateProduct,
  ProductResponse,
} from "@shared/generated/product.proto";

import { Injectable } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";

import { PrismaService } from "src/common/modules/prisma/prisma.service";

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async createProduct(request: CreateProduct) {
    return this.prismaService.product.create({
      data: {
        title: request.title,
        company: {
          connect: {
            uid: request.companyId,
          },
        },
      },
    });
  }

  async getProduct(uid: string): Promise<ProductResponse> {
    const res = await this.prismaService.product.findUnique({
      where: {
        uid,
      },
    });

    if (!res) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: "Company not found",
      });
    }

    return res;
  }
}
