from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .serializers import ExpenseSerializer
from .models import Expense
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework import response
from django.db.models import Sum


# create or save an expense
class ExpenseListAPIView(ListCreateAPIView):
    serializer_class = ExpenseSerializer
    queryset = Expense.objects.all()
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        return serializer.save(owner=self.request.user)

    def get_queryset(self):
        return self.queryset.filter(owner=self.request.user)

# Creates a view that allows users to retrieve, update and delete an expense
class ExpenseDetailAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = ExpenseSerializer
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Expense.objects.all()
    lookup_field = 'id'

    def get_queryset(self):
        return self.queryset.filter(owner=self.request.user)

class TotalExpenseStatus(APIView):
    def get(self,request):
        expenses = Expense.objects.filter(owner=request.user)
        total_amount = expenses.aggregate(Sum("amount"))
        return response.Response(total_amount)