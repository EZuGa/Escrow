# Generated by Django 4.2.5 on 2023-10-08 17:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0014_user_balance_cny_user_balance_eur_user_balance_usd_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='directory',
            name='status',
            field=models.CharField(choices=[('ongoing', 'Ongoing'), ('failed', 'Failed'), ('succeeded', 'Succeeded')], default='ongoing', max_length=10),
        ),
    ]