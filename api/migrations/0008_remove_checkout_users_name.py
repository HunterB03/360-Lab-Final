# Generated by Django 5.1.7 on 2025-04-24 19:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_remove_checkout_email'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='checkout',
            name='users_name',
        ),
    ]
