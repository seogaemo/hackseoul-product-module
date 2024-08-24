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
import { Observable } from "rxjs";

import { Controller } from "@nestjs/common";

import { ProductService } from "./product.service";

@Controller()
@ProductServiceControllerMethods()
export class ProductController implements ProductServiceController {
  constructor(private readonly productService: ProductService) {}

  createProduct(
    request: CreateProduct,
  ): Promise<SuccessResponse> | Observable<SuccessResponse> | SuccessResponse {
    return this.productService.createProduct(request).then(() => {
      return { success: true };
    });
  }

  getProduct(
    request: Uid,
  ): Promise<ProductResponse> | Observable<ProductResponse> | ProductResponse {
    return this.productService.getProduct(request.uid);
  }
}
