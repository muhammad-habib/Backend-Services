from fastapi import APIRouter

from api.controllers.users_controller import users_ctrl

router = APIRouter()

router.include_router(users_ctrl)
