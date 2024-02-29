from django.db import models
from db_connection import invoice_collection

class Invoices(models.Model):
    nit = models.PositiveIntegerField()
    name = models.CharField(max_length=100)
    date = models.DateField()
    infile_detail = models.JSONField()
    producto = models.CharField(max_length=100)
    descripcion = models.TextField()
    detail_name = models.TextField()
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    total = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=3)
    fel_pdf_doc = models.FileField(upload_to='fel_pdfs/', blank=True, null=True)

    def createInvoice(self):
        invoice_collection.insert_one({
            'nit': self.nit,
            'name': self.name,
            'date': self.date,
            'infile_detail': [
                {
                    "producto": self.producto,
                    "descripcion": self.descripcion,
                    "detail_name": self.detail_name,
                    "quantity": self.quantity,
                    "price": str(self.price),  # Convertir a cadena para compatibilidad BSON
                }
            ],
            'total': str(self.total),
            'status': self.status,  # Convertir a cadena para compatibilidad BSON
            'fel_pdf_doc': str(self.fel_pdf_doc),  # Convertir a cadena para compatibilidad BSON
        })
