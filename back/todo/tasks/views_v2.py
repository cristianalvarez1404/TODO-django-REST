from .serializers_v2 import TaskSerializer
from rest_framework import viewsets
from .models import Task

class TaskViewSet(viewsets.ModelViewSet):
  queryset = Task.objects.all()
  serializer_class = TaskSerializer
  lookup_field = 'id'


