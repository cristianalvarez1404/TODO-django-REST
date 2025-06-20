from django.contrib import admin
from django.urls import path,include
from .views import TasksViewsSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'tasks',TasksViewsSet)

urlpatterns = [
    path('',include(router.urls))
]
