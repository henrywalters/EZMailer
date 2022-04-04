import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	if (process.env.ALLOW_CORS) {
		app.enableCors();
	}
	app.useGlobalPipes(new ValidationPipe());

	const documentationConfig = new DocumentBuilder()
		.setTitle(`${process.env.APP_NAME} Documentation`)
		.setDescription(`The ${process.env.APP_NAME} api documentation`)
		.setVersion('1.0')
		.addTag(process.env.APP_NAME)
		.build();

	const documentation = SwaggerModule.createDocument(app, documentationConfig);
	SwaggerModule.setup('documentation', app, documentation);

	await app.listen(process.env.APP_PORT);
}
bootstrap();
