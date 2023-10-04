# Generated by Django 4.2.5 on 2023-10-04 09:20

import apps.users.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0008_file_file'),
    ]

    operations = [
        migrations.AddField(
            model_name='directory',
            name='path',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='file',
            name='file',
            field=models.FileField(null=True, upload_to=apps.users.models.file_upload_path),
        ),
    ]
