from django.shortcuts import render
from django.http import HttpResponse
from .models import Task
from django.shortcuts import get_object_or_404
from .serializers import TaskSerializer
from rest_framework.decorators import api_view  
from rest_framework.response import Response  
from rest_framework import status


@api_view(["GET"])
def get_tasks(request):
  tasks = Task.objects.all()
  serializer = TaskSerializer(tasks,many=True)
  return Response(serializer.data)

#v1
"""
@api_view(["POST"])
def create_task(request):
  title = request.data.get('title')
  description = request.data.get('description')

  if not title or not description:
    return Response({"error":"Title and description are required 😢"},status=status.HTTP_400_BAD_REQUEST)

  if Task.objects.filter(title=title).exists():
    return Response({"error":"Task already exists 😢"},status=status.HTTP_400_BAD_REQUEST)
  
  task = Task.objects.create(
    title = title,
    description = description,
    completed= request.data.get("completed",False)
  )

  serializer = TaskSerializer(task)

  return Response(serializer.data,status=status.HTTP_201_CREATED)
"""

#v2
@api_view(["POST"])
def create_task(request):
  serializer = TaskSerializer(data=request.data)

  if not serializer.is_valid():
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
  
  title = serializer.validated_data['title']

  if Task.objects.filter(title=title).exists():
    return Response({"error":"Task already exists 😢"},status=status.HTTP_400_BAD_REQUEST)

  serializer.save()

  return Response(serializer.data,status=status.HTTP_201_CREATED)


@api_view(["PUT"])
def update_post(request, id):
  if request.method == 'PUT':
    task = get_object_or_404(Task, id=id)
  
    title = request.data.get('title')
    description = request.data.get('description')
    completed = request.data.get('completed')
    
    if title is not None:
      task.title = title
    
    if description is not None:
      task.description = description
    
    if completed is not None:
      task.completed = completed in ['true','True',True]
      
    task.save()
    
    serializer = TaskSerializer(task)
    
    return Response(serializer.data)
  
@api_view(["DELETE"])
def delete_task(request,id):
  task = get_object_or_404(Task,id=id)
  task.delete()
  
  return Response({"message":"Task has been deleted 🚀"},status=status.HTTP_200_OK)