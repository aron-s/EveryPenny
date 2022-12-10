from django.db import models
from django.contrib.auth.models import User

# Create your models here.
CATEGORY = [
        ('ONLINE_SERVICES', 'ONLINE_SERVICES'),
        ('TRAVEL', 'TRAVEL'),
        ('FOOD', 'FOOD'),
        ('RENT', 'RENT'),
        ('ENTERTAINMENT', 'ENTERTAINMENT'),
        ("BILLS", "BILLS"),
        ('OTHERS', 'OTHERS')
    ]

class Budget(models.Model):

    category = models.CharField(choices=CATEGORY, max_length=255)
    max_amount = models.DecimalField(max_digits=10, decimal_places=2, max_length=255)
    owner = models.ForeignKey(to=User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('category', 'owner',)
        ordering: ['-updated_at']  # type: ignore comment;

    def __str__(self):
        return str(self.category)


class Expense(models.Model):

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


