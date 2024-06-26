import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { ReportsModule } from './reports/reports.module';
import { Report } from './reports/entities/report.entity';
@Module({
  imports: [TypeOrmModule.forRoot({
    type: "sqlite",
    database: "db.sqlite",
    entities: [User, Report],
    synchronize: true,
    autoLoadEntities: true,
    logging: true,
  }), UsersModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
