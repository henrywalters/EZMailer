import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandFactory } from 'nest-commander';
import { getConnection } from 'typeorm';
import { ApiKeyCommand } from './commands/apiKey';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [
    ApiKeyCommand,
  ]
})
export class ConsoleModule {
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

async function bootstrap() {
    await CommandFactory.run(ConsoleModule);
}

bootstrap();
