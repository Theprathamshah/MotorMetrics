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

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    return await this.repo.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { email, password } = updateUserDto;
    const savedUser = await this.repo.findOne({ where: { id } });
    savedUser.email = email;
    savedUser.password = await bcrypt.hash(password, 10);
    return this.repo.save(savedUser);

  }

  remove(id: number) {
    return this.repo.delete(id)
  }
}
