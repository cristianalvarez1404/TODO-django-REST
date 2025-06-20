from django.db import models
import uuid

class Task(models.Model):
  id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
  title = models.CharField(max_length=255)
  description = models.TextField()
  completed = models.BooleanField(default=False)
  created_at = models.DateField(auto_now_add=True)
  
  def __str__(self):
    return self.title