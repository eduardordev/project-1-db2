from django.http import JsonResponse
from django.views.decorators.http import require_POST, require_GET
from django.views.decorators.csrf import csrf_exempt
from .models import UserProfile
from db_connection import user_profile_collection
from django.contrib.auth.hashers import check_password
from django.contrib.auth import login
import json

@csrf_exempt
@require_GET
def get_users(request):
    if request.method == 'GET':
        users = user_profile_collection.find()
        user_list = [{'username': user['username'], 'email': user['email']} for user in users]
        return JsonResponse(user_list, safe=False)

@csrf_exempt
@require_POST
def create_user(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')

        # Validar los datos según tus requisitos
        if not username or not email:
            return JsonResponse({'error': 'Invalid data'}, status=400)

        new_user = UserProfile(username=username, email=email, password=password)
        new_user.createUser()
        return JsonResponse({'message': 'Usuario creado exitosamente'}, status=201)

@csrf_exempt
@require_GET
def user_detail(request, pk):
    try:
        user = user_profile_collection.find_one({'_id': pk})
    except UserProfile.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)

    if request.method == 'GET':
        user_dict = {'username': user['username'], 'email': user['email']}
        return JsonResponse(user_dict)

@csrf_exempt
@require_POST
def update_user(request, pk):
    try:
        user = user_profile_collection.find_one({'_id': pk})
    except UserProfile.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)

    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')

        # Validar los datos según tus requisitos
        if not username or not email:
            return JsonResponse({'error': 'Invalid data'}, status=400)

        user_profile_collection.update_one({'_id': pk}, {'$set': {'username': username, 'email': email}})
        return JsonResponse({'message': 'Usuario actualizado exitosamente'})

@csrf_exempt
@require_POST
def delete_user(request, pk):
    try:
        user_profile_collection.delete_one({'_id': pk})
        return JsonResponse({'message': 'Usuario eliminado exitosamente'}, status=204)
    except UserProfile.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)


@csrf_exempt
def signin(request):
    if request.method == 'OPTIONS':
        response = JsonResponse({}, status=200)
        response['allow'] = 'POST, OPTIONS'
        return response

    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            print(username)
            password = data.get('password')
            print(password)
            if not username or not password:
                return JsonResponse({'error': 'Invalid data'}, status=400)
            
            user = user_profile_collection.find_one({'username': username})
            print(user)
            
            if user and user.get('password') == password:
                return JsonResponse({'message': 'Inicio de sesión exitoso'})
            else:
                return JsonResponse({'error': 'Credenciales incorrectas'}, status=401)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format'}, status=400)