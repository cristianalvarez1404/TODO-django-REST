from django.contrib import admin
from django.urls import path,include
from .views import get_tasks,update_post,create_task,delete_task
from rest_framework import routers
from .views_v2 import TaskViewSet

router = routers.DefaultRouter()
router.register(r'tasks',TaskViewSet)

urlpatterns = [
    path('',include(router.urls)),
    # path('',get_tasks),
    # path('create-task/',create_task),
    # path('update-task/<str:id>/',update_post),
    # path('delete-task/<str:id>/',delete_task)
]
