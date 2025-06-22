from django.urls import path,include
from .models import Task
from rest_framework import serializers

class TaskSerializer(serializers.ModelSerializer):
  class Meta:
    model = Task
    fields = '__all__'

  def validate_title(self, value):
    if not isinstance(value, str):
        raise serializers.ValidationError("Title should be a string.")
    if not value.strip():
        raise serializers.ValidationError("Title can't be empty.")
    return value

def validate_description(self, value):
    if not isinstance(value, str):
        raise serializers.ValidationError("Description should be a string.")
    if not value.strip():
        raise serializers.ValidationError("Description can't be empty.")
    return value