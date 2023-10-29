import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CountersModule } from './counters/counters.module';
import { AuthModule } from './auth/auth.module';
import { PageViewModule } from './page-view/page-view.module';

@Module({
  imports: [UsersModule, CountersModule, AuthModule, PageViewModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
