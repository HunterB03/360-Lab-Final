# Generated by Django 5.1.7 on 2025-03-31 01:45

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Listing',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('content', models.CharField(max_length=500)),
                ('pub_date', models.DateTimeField(auto_now_add=True)),
                ('img', models.ImageField(blank=True, default='default.jpg', upload_to='')),
            ],
        ),
    ]
