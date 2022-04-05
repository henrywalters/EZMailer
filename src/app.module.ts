import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnection } from 'typeorm';
import { DomainController } from './controllers/domain.controller';
import { EmailController } from './controllers/email.controller';
import { SenderController } from './controllers/sender.controller';
import { TemplateController } from './controllers/template.controller';
import { EmailService } from './services/email.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [
    DomainController,
    SenderController,
    TemplateController,
    EmailController,
  ],
  providers: [
    EmailService,
  ],
})
export class AppModule {
  async configure(consumer: MiddlewareConsumer) {
    await this.setEntityConnections();
  }

  async setEntityConnections() {
      const connection = await getConnection();
      connection.entityMetadatas.forEach(entity => {
          (entity.target as any).useConnection(connection);
      })
  }
}
