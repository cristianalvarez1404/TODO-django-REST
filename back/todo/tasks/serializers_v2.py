from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

    def validate_title(self,data):
        if not isinstance(data,str):
            raise serializers.ValidationError("Title should be a string")
        
        if not data.strip():
            raise serializers.ValidationError("Title can't no be empty")

        return data
    
    def validate_description(self,data):
        if not isinstance(data,str):
            raise serializers.ValidationError("Description should be a string")
        
        if not data.strip():
            raise serializers.ValidationError("Description can't no be empty")
        
        return data