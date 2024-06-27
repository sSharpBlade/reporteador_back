import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Query } from '../../common/entities/Query.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SqlService {
    constructor (
        @InjectRepository(Query)
        private readonly queryRepository:Repository<Query>
    ){}

    async create(sentence:string) {
        return await this.queryRepository.save({sentence});
 }
}