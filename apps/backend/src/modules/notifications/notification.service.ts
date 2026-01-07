import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '../../dtos/entities/notifications.entity';
import { CreateNotificationRequest } from '../../dtos/requests/create-notification.request';
import { UpdateNotificationRequest } from '../../dtos/requests/update-notification.request';
import { NotificationResponse } from '../../dtos/response/notification.response';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  async create(
    createNotificationDto: CreateNotificationRequest,
  ): Promise<NotificationResponse> {
    const notification = this.notificationRepository.create({
      notification_type: createNotificationDto.notification_type,
      message: createNotificationDto.message,
      status: createNotificationDto.status || 'pending',
    });
    const savedNotification =
      await this.notificationRepository.save(notification);
    return new NotificationResponse(
      savedNotification.id,
      savedNotification.notification_type,
      savedNotification.message,
      savedNotification.created_at,
      savedNotification.viewed,
      savedNotification.viewed_at,
      savedNotification.status,
    );
  }

  async findAll(): Promise<NotificationResponse[]> {
    const notifications = await this.notificationRepository.find();
    return notifications.map(
      (notification) =>
        new NotificationResponse(
          notification.id,
          notification.notification_type,
          notification.message,
          notification.created_at,
          notification.viewed,
          notification.viewed_at,
          notification.status,
        ),
    );
  }

  async findOne(id: number): Promise<NotificationResponse> {
    const notification = await this.notificationRepository.findOneBy({ id });
    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }
    return new NotificationResponse(
      notification.id,
      notification.notification_type,
      notification.message,
      notification.created_at,
      notification.viewed,
      notification.viewed_at,
      notification.status,
    );
  }

  async update(
    updateNotificationDto: UpdateNotificationRequest,
  ): Promise<NotificationResponse> {
    const notification = await this.notificationRepository.findOneBy({
      id: updateNotificationDto.id,
    });
    if (!notification) {
      throw new NotFoundException(
        `Notification with ID ${updateNotificationDto.id} not found`,
      );
    }
    if (updateNotificationDto.notification_type !== undefined) {
      notification.notification_type = updateNotificationDto.notification_type;
    }
    if (updateNotificationDto.message !== undefined) {
      notification.message = updateNotificationDto.message;
    }
    if (updateNotificationDto.viewed !== undefined) {
      notification.viewed = updateNotificationDto.viewed;
      notification.viewed_at = updateNotificationDto.viewed ? new Date() : null;
    }
    if (updateNotificationDto.status !== undefined) {
      notification.status = updateNotificationDto.status;
    }
    const updatedNotification =
      await this.notificationRepository.save(notification);
    return new NotificationResponse(
      updatedNotification.id,
      updatedNotification.notification_type,
      updatedNotification.message,
      updatedNotification.created_at,
      updatedNotification.viewed,
      updatedNotification.viewed_at,
      updatedNotification.status,
    );
  }

  async remove(id: number): Promise<void> {
    const result = await this.notificationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }
  }
}
