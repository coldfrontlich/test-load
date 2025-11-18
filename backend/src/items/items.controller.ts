import { Controller, Get, Query } from '@nestjs/common';
import { ItemsService } from './items.service';
import { GetItemsDto } from './dto/get-items.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  findAll(@Query() dto: GetItemsDto) {
    return this.itemsService.findAll(dto.limit, dto.cursor);
  }
}
