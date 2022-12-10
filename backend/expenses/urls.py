from django.urls import path
from .views import ExpenseDetailAPIView, ExpenseListAPIView, TotalExpenseStatus, BudgetDetailAPIView, BudgetListAPIView, TotalBudgetStatus


urlpatterns = [
    path('', ExpenseListAPIView.as_view()),
    path('<int:id>/', ExpenseDetailAPIView.as_view()),
    path("total-expense/", TotalExpenseStatus.as_view(),
         name="total-expense-stats"),
    path('budget/', BudgetListAPIView.as_view()),
    path('budget/<int:id>/', BudgetDetailAPIView.as_view()),
    path("total-budget/", TotalBudgetStatus.as_view(),
         name="total-budget-stats"),
]
