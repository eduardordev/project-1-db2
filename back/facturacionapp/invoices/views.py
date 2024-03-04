from bson import ObjectId
from django.http import JsonResponse
from django.views.decorators.http import require_POST, require_GET
from django.core.exceptions import ValidationError
import json
from django.views.decorators.csrf import csrf_exempt
from .models import Invoices
from db_connection import invoice_collection, fs
import pymongo
from django.core.paginator import Paginator
from math import ceil
from django.core.files.storage import default_storage
from django.http import HttpResponse, HttpResponseNotFound, HttpResponseBadRequest

from gridfs import GridFS, NoFile

from bson import ObjectId  # Import ObjectId from bson

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

# Create your views here.
# Crear un índice en la columna 'status'
invoice_collection.create_index([("status", pymongo.ASCENDING)])


@csrf_exempt
@require_GET
def get_invoices(request):
    if request.method == "GET":
        # Obtener los parámetros de la consulta
        status_filter = request.GET.get("status")
        page_number = int(request.GET.get("page", 1))
        page_size = 10  # Ajusta el tamaño de la página según tus necesidades

        # Construir la consulta MongoDB
        query = {}  # Consulta sin filtro inicial
        if status_filter and status_filter in ["VIG", "ANU"]:
            query["status"] = status_filter

        # Realizar la consulta optimizada utilizando el índice
        invoices_cursor = (
            invoice_collection.find(
                query, {"nit": 1, "name": 1, "date": 1,
                        "infile_detail": 1, "total": 1}
            )
            .skip((page_number - 1) * page_size)
            .limit(page_size)
        )

        # Obtener la cantidad total de elementos utilizando count_documents
        total_elements = invoice_collection.count_documents(query)

        # Calcular la cantidad de páginas
        total_pages = ceil(total_elements / page_size)

        # Convertir el cursor a una lista de diccionarios
        invoice_list = [
            {
                "id": str(invoice["_id"]),
                "nit": invoice["nit"],
                "name": invoice["name"],
                "date": invoice["date"],
                "infile_detail": invoice["infile_detail"],
                "total": invoice["total"],
                "status": str(invoice.get("status", "")),
                "fel_pdf_doc": str(invoice.get("fel_pdf_doc", "")),
            }
            for invoice in invoices_cursor
        ]

        return JsonResponse(
            {
                "invoices": invoice_list,
                "total_pages": total_pages,
                "current_page": page_number,
            },
            safe=False,
        )


@csrf_exempt
@require_POST
def create_invoice(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            nit = data.get("nit")
            name = data.get("name")
            print(data)
            date = data.get("date")
            infile_detail = data.get("infile_detail", [])
            total = data.get("total")
            status = data.get("status")
            fel_pdf_doc = data.get("fel_pdf_doc")

            # Validar los datos según tus requisitos
            if not nit:
                return JsonResponse(
                    {"error": 'El campo "nit" es requerido.'}, status=400
                )

            new_invoice = Invoices(
                nit=nit,
                name=name,
                date=date,
                infile_detail=infile_detail,
                total=total,
                status=status,
                fel_pdf_doc=fel_pdf_doc
            )

            new_invoice.createInvoice()

            return JsonResponse({"message": "Factura creada exitosamente"}, status=201)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)


@api_view(["GET"])
@permission_classes([AllowAny])
def get_invoice(request, pk):
    try:

        object_id = ObjectId(pk)

        invoice = invoice_collection.find_one({"_id": object_id})

        if invoice is None:
            return JsonResponse({"error": "Invoice not found"}, status=404)

        if request.method == "GET":
            invoice_dict = {
                "id": str(invoice["_id"]),
                "nit": invoice.get("nit", ""),
                "name": invoice.get("name", ""),
                "date": invoice.get("date", ""),
                "infile_detail": invoice.get("infile_detail", ""),
                "total": invoice.get("total", ""),
                "status": invoice.get("status", ""),
                "fel_pdf_doc": invoice.get("fel_pdf_doc", ""),
            }
            return JsonResponse(invoice_dict)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


@csrf_exempt
@require_POST
def update_invoice(request, pk):
    try:
        # Parse the JSON body of the request.
        data = json.loads(request.body)

        # Extracting information from the data.
        nit = data.get("nit")
        name = data.get("name")
        date = data.get("date")
        infile_detail = data.get("infile_detail", [])
        total = data.get("total")
        status = data.get("status")
        # Assuming this is a reference, not the file content itself.
        fel_pdf_doc = data.get("fel_pdf_doc", "")

        # Validating the required data.
        if not nit:
            return JsonResponse({"error": 'El campo "nit" es requerido.'}, status=400)

        # Preparing the update document.
        update_data = {
            '$set': {
                'nit': nit,
                'name': name,
                'date': date,
                'infile_detail': infile_detail,
                'total': total,
                'status': status,
                'fel_pdf_doc': fel_pdf_doc,
            }
        }

        object_id = ObjectId(pk)

        # Updating the invoice in the database.
        invoice_collection.update_one({'_id': object_id}, update_data)

        return JsonResponse({"message": "Factura actualizada exitosamente"})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)


@csrf_exempt
@require_POST
def delete_invoice(request, pk):
    try:
        invoice_collection.delete_one({"_id": pk})
        return JsonResponse({"message": "Factura eliminada exitosamente"}, status=204)
    except Invoices.DoesNotExist:
        return JsonResponse({"error": "Invoice not found"}, status=404)


@csrf_exempt
@require_POST
def anular_factura(request):
    try:
        object_id = ObjectId(request.POST.get("id", ""))
        invoice = invoice_collection.find_one({"_id": object_id})
        if invoice is None:
            return JsonResponse({"error": "Invoice not found"}, status=404)

        # Actualizar el estado de la factura a "ANU"
        invoice_collection.update_one(
            {"_id": object_id}, {"$set": {"status": "ANU"}})

        return JsonResponse({"message": "Factura Anulada Exitosamente!"})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


def get_monthly_sales_of_year(request):
    if request.method == "GET":
        year_filter = request.GET.get("year")
        if not year_filter:
            return JsonResponse({"error": "Missing year filter"}, status=400)
        year_filter = int(year_filter)
        pipeline = [
            {
                "$project": {
                    "year": {"$year": {"$toDate": "$date"}},
                    "month": {"$month": {"$toDate": "$date"}},
                    "total": {"$toDecimal": "$total"},
                }
            },
            {"$match": {"year": year_filter}},
            {
                "$group": {
                    "_id": {"year": "$year", "month": "$month"},
                    "sales": {"$sum": "$total"},
                }
            },
            {
                "$project": {
                    "_id": 0,
                    "year": "$_id.year",
                    "month": "$_id.month",
                    "sales": 1,
                }
            },
            {"$sort": {"year": -1, "month": 1, "sales": -1}},
        ]
        reports = invoice_collection.aggregate(pipeline)
        # Convert Decimal128 to string for JSON serialization
        report_list = [{
            'year': report['year'],
            'month': report['month'],
            'sales': str(report['sales'])  # Convert Decimal128 to string
        } for report in reports]

        return JsonResponse(report_list, safe=False)


def get_units_sold_from_category(request):
    if request.method == 'GET':
        category_filter = request.GET.get('category')
        if not category_filter:
            return JsonResponse({'error': 'Missing category filter'}, status=400)
        pipeline = [
            {'$unwind': {'path': '$infile_detail'}},
            {'$group': {
                '_id': '$infile_detail.category',
                'units_sold': {'$sum': '$infile_detail.quantity'}
            }},
            {'$sort': {'units_sold': -1}},
            {'$project': {
                '_id': 0,
                'category': '$_id',
                'units_sold': 1
            }},
            {'$match': {'category': {'$ne': None}, 'category': category_filter}}
        ]
        reports = invoice_collection.aggregate(pipeline)
        report_list = [{
            'category': report['category'],
            'units_sold': report['units_sold']
        } for report in reports]

        return JsonResponse(report_list, safe=False)


def get_top_customers_by_total_spent(request, n=5):
    if request.method == 'GET':
        pipeline = [
            {'$group': {
                '_id': '$name',
                'total_spent': {'$sum': '$total'}
            }},
            {'$sort': {'total_spent': -1}},
            {'$limit': n}
        ]
        result = invoice_collection.aggregate(pipeline)
        top_customers = list(result)
        return JsonResponse(top_customers, safe=False)


def get_average_price_per_category(request):
    if request.method == 'GET':
        pipeline = [
            {'$unwind': '$infile_detail'},
            {'$group': {
                '_id': '$infile_detail.category',
                'average_price': {'$avg': '$infile_detail.price'}
            }},
            {'$project': {
                '_id': 0,
                'category': '$_id',
                'average_price': 1
            }},
            {'$match': {
                'category': {'$ne': None}
            }}
        ]
        result = invoice_collection.aggregate(pipeline)
        average_prices = list(result)
        return JsonResponse(average_prices, safe=False)


@api_view(["GET"])
@permission_classes([AllowAny])
def download_file(request, file_path):
    try:
        # Fetch the file from GridFS using the file path
        file_content = default_storage.open(file_path).read()

        # Create an HTTP response with the file content
        response = HttpResponse(
            file_content, content_type='application/octet-stream')
        response['Content-Disposition'] = f'attachment; filename="{file_path}"'
        return response
    except FileNotFoundError:
        return HttpResponseNotFound("File not found")
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


@api_view(["POST"])
@permission_classes([AllowAny])
def upload_file(request):
    if request.method == "POST":
        try:
            file = request.FILES.get('file')

            if not file:
                return HttpResponseBadRequest("File not provided")

            # Save the file to GridFS
            file_path = default_storage.save(file.name, file)

            return JsonResponse({"file_path": file_path}, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)


def get_file(request, file_id):
    try:
        f = fs.get(ObjectId(file_id))
        file_data = f.read()
        response = HttpResponse(file_data, content_type='text/plain')
        response['Content-Disposition'] = 'attachment; filename="test.txt"'
        return response
    except NoFile:
        raise ValueError("File not found!")


@csrf_exempt
def bulk_anular_facturas(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            invoice_ids = data.get("invoice_ids", [])

            # Convertir string IDs a ObjectId
            object_ids = [ObjectId(invoice_id) for invoice_id in invoice_ids]

            # Operación de actualización masiva para establecer el estado en "ANU"
            result = invoice_collection.update_many(
                {"_id": {"$in": object_ids}},
                {"$set": {"status": "ANU"}}
            )

            # Responder con cuántas facturas se actualizaron
            return JsonResponse({"message": f"{result.modified_count} facturas anuladas exitosamente"})
        except json.JSONDecodeError:
            return JsonResponse({"error": "Formato JSON no válido"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    else:
        return JsonResponse({"error": "Método de solicitud no válido"}, status=405)
