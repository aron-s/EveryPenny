from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Expense(models.Model):

    CATEGORY = [
        ('ONLINE_SERVICES', 'ONLINE_SERVICES'),
        ('TRAVEL', 'TRAVEL'),
        ('FOOD', 'FOOD'),
        ('RENT', 'RENT'),
        ('ENTERTAINMENT', 'ENTERTAINMENT'),
        ("BILLS", "BILLS"),
        ('OTHERS', 'OTHERS')
    ]

    category = models.CharField(choices=CATEGORY, max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2, max_length=255)
    owner = models.ForeignKey(to=User, on_delete=models.CASCADE)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering: ['-updated_at']  # type: ignore comment;

    def __str__(self):
        return str(self.owner)+'s income'

