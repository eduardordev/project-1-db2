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
from django.urls import path

from user_profile.views import get_users, create_user, user_detail, update_user, delete_user

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', get_users, name='get_users'),
    path('users/create/', create_user, name='create_user'),
    path('users/<str:pk>/', user_detail, name='user_detail'),#si quiero cambiar a busqyeda por pk int cambiar a <int:pk>
    path('users/<str:pk>/update/', update_user, name='update_user'),
    path('users/<str:pk>/delete/', delete_user, name='delete_user'),
]
