from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from .models import Task
from .serializers import TaskSerializer

class TasksViewsSet(viewsets.ModelViewSet):
  queryset = Task.objects.all()
  serializer_class = TaskSerializer