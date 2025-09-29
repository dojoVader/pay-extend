import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ExtensionContext } from '../../dtos/entities/extension.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtensionRequest } from 'src/dtos/requests/extension.request';

const PAGINATION_LIMIT = 10;

type ExtensionStatus = 'published | pending | rejected ';

@Injectable()
export class ExtensionService {
  constructor(
    @InjectRepository(ExtensionContext)
    private extensionRepository: Repository<ExtensionContext>,
  ) {}

  async getActiveExtensions() {
    return this.extensionRepository.findOneBy({
      active: true,
    });
  }

  async getExtensionByStatus(status: ExtensionStatus) {
    return this.extensionRepository.find({
      where: {
        status,
      },
    });
  }

  async getExtensions(offset: number): Promise<ExtensionContext[]> {
    return this.extensionRepository.find({
      take: PAGINATION_LIMIT,
      skip: offset,
    });
  }
  /**
   * This method saves an extension to the PayExtend platform allowing the user
   * to add extensions to the platform
   * @param data ExtensionRequest
   * @returns
   */
  async create(data: ExtensionRequest) {
    return this.extensionRepository.create(data);
  }
}
