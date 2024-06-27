import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../application/dto/create-user.dto';
import { UpdateUserDto } from '../../application/dto/update-user.dto';
import { Users } from '../../../common/entities/Users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.usersRepository.save(createUserDto);
  }

  async findOneByEmail(email: string): Promise<Users> {
    return this.usersRepository.findOne({
      where: { email },
      relations: ['roleUsers', 'roleUsers.idRole'],
    });
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async remove(id: number) {
    return await this.usersRepository.softDelete(id);
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(id, updateUserDto);
  }
  async findOne(idUser: number) {
    return await this.usersRepository.findOneBy({ idUser });
  }
}
