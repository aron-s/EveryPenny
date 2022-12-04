from django.urls import path
from .views import ExpenseDetailAPIView, ExpenseListAPIView, TotalExpenseStatus


urlpatterns = [
    path('', ExpenseListAPIView.as_view()),
    path('<int:id>/', ExpenseDetailAPIView.as_view()),
    path("total-expense/", TotalExpenseStatus.as_view(),
         name="total-expense-stats"),
]
