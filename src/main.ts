import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const expressApp = app.getHttpAdapter().getInstance();
  // Set up Liquid as the view engine
  expressApp.set('view engine', 'liquid');
  // Get the Liquid engine instance from the DI container
  const _liquidService = app.get(AppService);
  expressApp.engine('liquid', _liquidService.getLiquidEngine().express());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().then();
