from rest_framework import serializers
from .models import Expense, Budget
from django.db.utils import IntegrityError


class ExpenseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Expense
        fields = ['id', 'description', 'amount', 'category']

class BudgetSerializer(serializers.ModelSerializer):

    class Meta:
        model = Budget
        fields = ['id', 'category', 'max_amount']
    
    def create(self, validated_data):
        try:
            budget = Budget.objects.create(**validated_data)
            return budget
        except(IntegrityError):
            raise serializers.ValidationError({'error': ('Budget is already created!')})
        
    # def update(self, instance, validated_data):
    #     try:
    #         budget = Budget.objects.update(**validated_data)
    #         return budget
    #     except(IntegrityError):
    #         raise serializers.ValidationError({'error': ('Budget is already created!')})

