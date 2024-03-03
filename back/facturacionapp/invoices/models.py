from django.db import models
from db_connection import invoice_collection, fs
from django.core.files.base import ContentFile
import base64
import hashlib
from decimal import Decimal



class Invoices(models.Model):
    nit = models.PositiveIntegerField()
    name = models.CharField(max_length=100)
    date = models.DateField()
    infile_detail = models.JSONField()
    producto = models.CharField(max_length=100)
    descripcion = models.TextField()
    category = models.TextField()
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    total = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=3)
    # fel_pdf_doc = models.FileField(upload_to='fel_pdfs/', blank=True, null=True)
    fel_pdf_doc = models.TextField()

    def calculate_hash(self, content):
        md5 = hashlib.md5()
        md5.update(content)
        return md5.hexdigest()

    def get_file(self, encoded_file):
        format, file_str = encoded_file.split(';base64,')
        ext = format.split('/')[-1]
        data = ContentFile(base64.b64decode(file_str), name='temp.' + ext)
        return data

    def createInvoice(self):
        metadata = {
            'nit': self.nit,
            'name': self.name,
            'date': self.date,
            'infile_detail': [
                {
                    "producto": detail.get("producto"),
                    "descripcion": detail.get("descripcion"),
                    "category": detail.get("category"),
                    "quantity": detail.get("quantity"),
                    "price": str(detail.get("value")),
                } for detail in self.infile_detail
            ],
            'total': str(self.total),
            'status': self.status,
        }

        if self.fel_pdf_doc:
            file = self.get_file(self.fel_pdf_doc)
            file_content = file.read()
            file_hash = self.calculate_hash(file_content)

            # Insert the file into GridFS
            file_id = fs.put(file_content, filename=file_hash)

            metadata['fel_pdf_doc'] = [{
                'filename': file_hash,
                'hash': file_hash,
                'file_id': str(file_id)
            }]

        invoice_collection.insert_one(metadata)

        return file_id
