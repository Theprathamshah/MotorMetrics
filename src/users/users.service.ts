import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {
    this.repo = repo;
  }
  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const userExist = await this.repo.findOne({ where: { email } });
    if (userExist) {
      throw new BadRequestException('User with this email already exist');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.repo.create({ email, password: hashedPassword });
    try {
      return this.repo.save(user);
    } catch (error) {
      throw new BadRequestException('Error Creating user')
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
