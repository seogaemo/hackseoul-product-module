import {
  SuccessResponse,
  Uid,
} from "@shared/generated/messages/messages.proto";
import {
  CreateProduct,
  ProductResponse,
  ProductServiceController,
  ProductServiceControllerMethods,
} from "@shared/generated/product.proto";
import {
  S3ServiceClient,
  S3_PACKAGE_NAME,
  S3_SERVICE_NAME,
} from "@shared/generated/s3.proto";
import { Observable, firstValueFrom } from "rxjs";

import { Controller, Inject } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";

import { ProductService } from "./product.service";

@Controller()
@ProductServiceControllerMethods()
export class ProductController implements ProductServiceController {
  constructor(
    @Inject(S3_PACKAGE_NAME)
    private readonly s3Client: ClientGrpc,
    private readonly productService: ProductService,
  ) {}

  private s3Service!: S3ServiceClient;

  onModuleInit() {
    this.s3Service = this.s3Client.getService<S3ServiceClient>(S3_SERVICE_NAME);
  }

  createProduct(
    request: CreateProduct,
  ): Promise<SuccessResponse> | Observable<SuccessResponse> | SuccessResponse {
    return firstValueFrom(
      this.s3Service.uploadImage({
        base64Image: request.base64Image,
      }),
    ).then((res) =>
      this.productService.createProduct(request, res.imagePath).then(() => {
        return { success: true };
      }),
    );
  }

  getProduct(
    request: Uid,
  ): Promise<ProductResponse> | Observable<ProductResponse> | ProductResponse {
    return this.productService.getProduct(request.uid);
  }
}
