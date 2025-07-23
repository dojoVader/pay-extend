import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { join } from 'node:path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const expressApp = app.getHttpAdapter().getInstance();
  // Set up Liquid as the view engine
  expressApp.set('view engine', 'liquid');
  // Get the Liquid engine instance from the DI container
  const _liquidService = app.get(AppService);
  expressApp.engine('liquid', _liquidService.getLiquidEngine().express());
  // Set the views directory
  expressApp.set('views', _liquidService.getLiquidViewsPath());
  const publicPath = join(__dirname, '..', 'public');
  app.getHttpAdapter().useStaticAssets(publicPath, {
    prefix: '/public', // Serve static files from the public directory
    index: false, // Disable directory listing
  });
  await app.listen(process.env.PORT ?? 3000);
  // Set a Public folder for static assets

  console.log(`Application is running on: ${process.env.PORT}`);
}
bootstrap().then();
