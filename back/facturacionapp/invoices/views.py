from django.http import JsonResponse
from django.views.decorators.http import require_POST, require_GET
from django.views.decorators.csrf import csrf_exempt
from .models import Invoices
from db_connection import invoice_collection

# Create your views here.

@csrf_exempt
@require_GET
def get_invoices(request):
    if request.method == 'GET':
        invoices = invoice_collection.find()
        invoice_list = [{
            'username': invoice['username'], 
            'name': invoice['name'], 
            'date': invoice['date'],
            'detail_name': invoice['detail_name'],
            'quantity': invoice['quantity'],
            'price': invoice['price'],
            'total': invoice['total']
        } for invoice in invoices]
        return JsonResponse(invoice_list, safe=False)

@csrf_exempt
@require_POST
def create_invoice(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        name = request.POST.get('name')
        date = request.POST.get('date')
        detail_name = request.POST.get('detail_name')
        quantity = request.POST.get('quantity')
        price = request.POST.get('price')
        total = request.POST.get('total')
        
        # Validar los datos según tus requisitos
        if not username:
            return JsonResponse({'error': 'Invalid data'}, status=400)

        new_invoice = Invoices(
            username=username, 
            name=name,
            date=date,
            detail_name=detail_name,
            quantity=quantity,
            price=price,
            total=total
        )
        new_invoice.createInvoice()
        return JsonResponse({'message': 'Factura creada exitosamente'}, status=201)

@csrf_exempt
@require_GET
def get_invoice(request, pk):
    try:
        invoice = invoice_collection.find_one({'_id': pk})
    except Invoices.DoesNotExist:
        return JsonResponse({'error': 'Invoice not found'}, status=404)

    if request.method == 'GET':
        invoice_dict = {
            'username': invoice['username'], 
            'name': invoice['name'], 
            'date': invoice['date'],
            'detail_name': invoice['detail_name'],
            'quantity': invoice['quantity'],
            'price': invoice['price'],
            'total': invoice['total']
        }
        return JsonResponse(invoice_dict)

@csrf_exempt
@require_POST
def update_invoice(request, pk):
    try:
        invoice = invoice_collection.find_one({'_id': pk})
    except Invoices.DoesNotExist:
        return JsonResponse({'error': 'Invoice not found'}, status=404)

    if request.method == 'POST':
        username = request.POST.get('username')
        name = request.POST.get('name')
        date = request.POST.get('date')
        detail_name = request.POST.get('detail_name')
        quantity = request.POST.get('quantity')
        price = request.POST.get('price')
        total = request.POST.get('total')

        # Validar los datos según tus requisitos
        if not username:
            return JsonResponse({'error': 'Invalid data'}, status=400)

        invoice_collection.update_one(
            {'_id': pk}, 
            {'$set': {
                'username': username, 
                'name': name,
                'date': date,
                'detail_name': detail_name,
                'quantity': quantity, 
                'price': price,
                'total': total
            }}
        )
        return JsonResponse({'message': 'Factura actualizada exitosamente'})

@csrf_exempt
@require_POST
def delete_invoice(request, pk):
    try:
        invoice_collection.delete_one({'_id': pk})
        return JsonResponse({'message': 'Factura eliminada exitosamente'}, status=204)
    except Invoices.DoesNotExist:
        return JsonResponse({'error': 'Invoice not found'}, status=404)

