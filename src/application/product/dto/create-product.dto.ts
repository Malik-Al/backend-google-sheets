export class CreateProductDto {
  vendorCode: string;
  name: string;
  picture: string;
  description: string;
  quantity: number;
  price: number;
  sale: number;
  afterSale: number;
}
