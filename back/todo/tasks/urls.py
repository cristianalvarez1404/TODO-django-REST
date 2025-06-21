from django.contrib import admin
from django.urls import path,include
from .views import get_tasks,update_post,create_task,delete_task
from rest_framework import routers

# router = routers.DefaultRouter()
# router.register(r'tasks',TasksViewsSet)

urlpatterns = [
    # path('',include(router.urls))
    path('',get_tasks),
    path('create-task/',create_task),
    path('update-task/<str:id>/',update_post),
    path('delete-task/<str:id>/',delete_task)
]
