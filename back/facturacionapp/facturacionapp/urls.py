"""
URL configuration for facturacionapp project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.contrib import admin

from user_profile.views import *
from invoices.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('signin/', signin, name='sign_in'),

    path('users/', get_users, name='get_users'),
    path('users/create/', create_user, name='create_user'),
    path('users/<str:pk>/', user_detail, name='user_detail'),#si quiero cambiar a busqyeda por pk int cambiar a <int:pk>
    path('users/<str:pk>/update/', update_user, name='update_user'),
    path('users/<str:pk>/delete/', delete_user, name='delete_user'),

    path('invoices/', get_invoices, name='get_invoices'),
    path('invoice/<str:pk>/', get_invoice, name='get_invoice'),
    path('invoices/create/', create_invoice, name='create_invoices'),
    path('invoices/<str:pk>/update/', update_invoice, name='update_invoice'),
    path('invoices/<str:pk>/delete/', delete_invoice, name='delete_invoice'),
    path('invoices/anular/', anular_factura, name='anular_factura'),
    # Agregaciones
    path('invoices/monthly_sales_of_year/', get_monthly_sales_of_year, name='monthly_sales_of_year'),
    path('invoices/units_sold_from_category/', get_units_sold_from_category, name='units_sold_from_category'),
    path('invoices/average_price_per_category/', get_average_price_per_category, name='average_price_per_category'),
    path('invoices/top_customers_by_total_spent/', get_top_customers_by_total_spent, name='top_customers_by_total_spent'),

]
