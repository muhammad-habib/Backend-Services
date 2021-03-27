from fastapi import APIRouter, Depends, Body
from fastapi.encoders import jsonable_encoder
from models.notification import Notification
from services.notification_service import NotificationService

notifications_ctrl = APIRouter(tags=["notifications"])


@notifications_ctrl.get('/notifications')
async def users(_notify_srv: NotificationService = Depends(NotificationService)):
    return await _notify_srv.get_notifications()


@notifications_ctrl.post('/notifications')
async def create_user(_notify_srv: NotificationService = Depends(NotificationService)
                      , notification: Notification = Body(...)):
    notification = jsonable_encoder(notification)
    notification = await _notify_srv.create_notification(notification)
    return notification
