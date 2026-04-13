import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChromeWebstoreService } from '../chrome-webstore/chrome-webstore.service';
import { PolarSettings } from '../../dtos/entities/polar/polar-settings.entity';

@Injectable()
export class PolarGuard implements CanActivate {
  constructor(
    private readonly chromeWebstoreService: ChromeWebstoreService,
    @InjectRepository(PolarSettings)
    private readonly settingsRepo: Repository<PolarSettings>,
  ) {}

  async canActivate(_context: ExecutionContext): Promise<boolean> {
    const isChromeCreds = await this.chromeWebstoreService.isCredentialSet();
    if (!isChromeCreds) {
      throw new UnauthorizedException(
        'Chrome Webstore credentials are not configured',
      );
    }

    // const settings = await this.settingsRepo.findOne({ where: {} });
    // if (!settings || !settings.enabled || !settings.oat) {
    //   throw new UnauthorizedException(
    //     'Polar integration is not enabled or OAT is missing',
    //   );
    // }

    return true;
  }
}
