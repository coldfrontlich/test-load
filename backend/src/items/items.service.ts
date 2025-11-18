import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findAll(
    limit: number,
    cursor?: number,
  ): Promise<{ items: Item[]; nextCursor: number | null }> {
    const cacheKey = `items_${limit}_${cursor || 0}`;
    const cached = await this.cacheManager.get<{
      items: Item[];
      nextCursor: number | null;
    }>(cacheKey);
    if (cached) return cached;
    const qb = this.itemsRepository.createQueryBuilder('item');
    if (cursor) {
      qb.where('item.id > :cursor', { cursor });
    }
    qb.orderBy('item.id', 'ASC').take(limit);

    const items = await qb.getMany();
    const nextCursor = items.length > 0 ? items[items.length - 1].id : null;
    const result = { items, nextCursor };
    await this.cacheManager.set(cacheKey, result, 60);
    return result;
  }
}
