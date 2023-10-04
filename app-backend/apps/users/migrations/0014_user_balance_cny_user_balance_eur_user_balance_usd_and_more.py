# Generated by Django 4.2.5 on 2023-10-04 12:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0013_message'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='balance_cny',
            field=models.FloatField(default=0),
        ),
        migrations.AddField(
            model_name='user',
            name='balance_eur',
            field=models.FloatField(default=0),
        ),
        migrations.AddField(
            model_name='user',
            name='balance_usd',
            field=models.FloatField(default=0),
        ),
        migrations.AddField(
            model_name='user',
            name='balance_usdt',
            field=models.FloatField(default=0),
        ),
    ]
